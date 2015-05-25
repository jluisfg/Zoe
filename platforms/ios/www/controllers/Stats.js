/* globals define, Backbone, User, _ */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var Chartist = require('chartist');
	var config = require('config');

	var Day = Backbone.Model.extend();
	var template = require('templates/stats');
	var Days = Backbone.Collection.extend({
		model: Day,
		getFirstWeekStatus: function(){
			var week = [this.at(0), this.at(1), this.at(2), this.at(3), this.at(4), this.at(5), this.at(6)];

			week = week.map(function(d){return d.toJSON();});

			var total = week.reduce(function(c, n){return c + n.total;}, 0);
			var percentage = total/7;
			var goal = User.current().getGoal();

			if(goal){
				percentage = parseInt(((percentage/1000)*100)/goal, 10);
			}else {
				percentage = 'N/A';
			}

			return {total: total, percentage: percentage};
		},
		getMonthlyStatus: function(){
			var month = this.toArray();

			var total = month.reduce(function(c, n){return c + n.get('total');}, 0);

			var percentage = 0;
			var goal = User.current().getGoal();

			if(month.length && goal){
				percentage = total/month.length;
				percentage = parseInt((((total/month.length)/1000)*100)/goal, 10);
			}else {
				percentage = 'N/A';
			}

			return {total: total, percentage: percentage};
		},
		getChartData: function(){
			return {
				labels: this.map(function(c){return c.get('date');}),
				serie: this.map(function(c){return parseFloat(c.get('total')/1000).toFixed(1);})
			};
		}
	});

	return Controller.extend({
		id: 'stats-page',
		template: template,
		title: 'Estadísticas',
		currentLabel: '',
		events: (function() {
            var events = _.extend({}, Controller.prototype.events, {
                'tap #monthly': 'monthly',
                'tap #weekly': 'weekly'
            });

            return events;
        })(),
		initialize: function(options){
			Controller.prototype.initialize.apply(this, arguments);

			this.collection = new Days();

			if(options.days){
				this.collection.reset(options.days);
			}

			return this.render();
		},
		update: function(days){
			this.collection.reset(days);

			return this;
		},
		hide: function(){
			this.bounceOutDown();
			this.trigger('hide');
		},
		onRender: function(){
			Controller.prototype.onRender.call(this);

			this.dom.monthly = this.$el.find('#monthly');
			this.dom.weekly = this.$el.find('#weekly');
		},
		onShow: function(){
			this.bounceInUp();
			this.weekly();
		},
		monthly: function(){
			this.dom.monthly.addClass('active');
			this.dom.weekly.removeClass('active');

			var data = this.collection.getChartData();
			this.drawChart(data.labels, data.serie);

			this.status('month', this.collection.getMonthlyStatus().percentage);
		},
		weekly: function(){
			this.dom.monthly.removeClass('active');
			this.dom.weekly.addClass('active');

			var data = this.collection.getChartData();
			this.drawChart(data.labels.slice(0, 7), data.serie.slice(0, 7));

			this.status('week', this.collection.getFirstWeekStatus().percentage);
		},
		drawChart: function(labels, serie){
			var goal = User.current().getGoal();
			var options = {
				reverseData: true,
				width: labels.length * 50,
				axisY: {
					offset: 30
				},
				axisX: {
				},
				high: goal,
				height: this.dom.content.height() - 20
			};

			if(!this.chart){
				this.chart = new Chartist.Bar('.ct-chart', {
					labels: labels,
					series: [serie]
				}, options);
			}else{
				this.chart.update({labels: labels, series: [serie]}, options);
			}
		},
		onRightButton: function(){
			if(!this.currentStatus){
				return;
			}

			var m = this.currentStatus + ' #Alcalinízate';

			window.plugins.actionsheet.show(config.SHARE.DEFAULT, function(option){
				switch(option){
				case 1: window.plugins.socialsharing.shareViaFacebook(m, null, config.FB.URL); break;
				case 2: window.plugins.socialsharing.shareViaTwitter(m, null, config.TWITTER); break;
				}
			});
		},
		status: function(type, percentage){
			var s = '';			
			switch(type){
			case 'week':
				s = 'La última semana logre el ' + (percentage || 0) + '% de mi hidratación alcalina.';
				break;
			default:
				s = 'El último mes logre ' + (percentage || 0) + '% de mi hidratación alcalina.';
				break;
			}

			this.currentStatus = s;
		}
	});
});