/* global define */
define('user', ['parse', 'config', 'moment'], function(Parse, config, moment){
	'use strict';

	return Parse.User.extend({
		getGoal: function(){
			var weight = this.get('weight') || 0;
			return parseFloat((weight * 0.036).toFixed(2), 10);
		},
		getJournal: function(){
			var journal = this.relation('journal');
			var today = new Date();
			var todayEnd = new Date();

			today.setHours(0,0,0,0);
			todayEnd.setHours(23,59,59,999);

			return journal.query()
				.greaterThanOrEqualTo('createdAt', today)
				.lessThanOrEqualTo('createdAt', todayEnd)
				.find(function(results){
					return results;
				})
				.then(function(results){
					var consumption = this.consumption = results.reduce(function(current, next){return current+next.get('consumption');}, 0);
					return consumption;
				}.bind(this));
		},
		getStats: function(){
			var day = 24 * 60 * 60 * 1000;
			var journal = this.relation('journal');
			var today = new Date();
			var todayEnd = new Date();

			today.setHours(0, 0, 0, 0);
			todayEnd.setHours(23, 59, 59, 999);

			var aMonthAgo = new Date((today*1)-(day*30));
			var userAge = (today - this.createdAt)/day;
			var goal = this.getGoal()*1000;

			userAge = userAge > 30 ? 30 : userAge;
			
			return journal.query()
				.greaterThanOrEqualTo('createdAt', aMonthAgo)
				.lessThanOrEqualTo('createdAt', todayEnd)
				.find()
				.then(function(results){
					var sum = function(current, next){return current+next.get('consumption');};
					var dayFilter = function(r){return (r.createdAt > this.d && r.createdAt <= this.e);};
					var monthlyResults = [];

					for(var d = today, e = todayEnd, i = 0; i<userAge; i++){
						var total = results.filter(dayFilter.bind({d: d, e: e})).reduce(sum, 0);
						var date = moment(d).format('DD');

						monthlyResults.push({total: total, date: date, percentage: goal > 0 ? parseFloat(((total * 100)/goal).toFixed(2),10): 'N/A'});

						d -= day;
						e -= day;
					}

					return monthlyResults;
				});
		}
	});
});