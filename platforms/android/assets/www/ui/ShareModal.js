/* globals define, _, forge */
define(['HTMLModal', 'templates/home_modal_share'], function(HTMLModal, template){
	'use strict';

	return HTMLModal.extend({
		events: (function () {
			var events = _.extend({}, HTMLModal.prototype.events, {
				'tap #shareFacebook': 'facebook',
				'tap #shareTwitter': 'twitter'
			});

			return events;
		})(),
		template: template,
		title: 'Compartir',
		initialize: function(){
			HTMLModal.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this;
		},
		hide: function(){
			this.bounceOutDown();
			this.trigger('hide');
			_.delay(this._detach.bind(this), 1000);
		},
		show: function(message, period, username, consumption, goal){
			this.message = message;
			this.username = username;
			this.consumption = consumption;
			this.goal = goal;
			this.period = period;

			HTMLModal.prototype.show.call(this);
		},
		twitter: function(){
			var url = 'http://zoewater.mx';
			var via = 'zoe_water';
			var message = encodeURIComponent(this.message);

			forge.tabs.open('https://twitter.com/intent/tweet?text=' + message + '&via=' + via + '&url=' + url);
			this.hide();
		},
		facebook: function(){
			var url = [
				'u=' + this.username,
				'c=' + this.consumption,
				'g=' + this.goal,
				'p=' + this.period
			].join('&');
			
			forge.facebook.ui({
				method: 'share_open_graph',
				action_type: 'og.likes',
				url: 'http://status.zoewater.com.mx/?' + url,
				action_properties: JSON.stringify({
					object:'https://graph.facebook.com/me/object/zoewaterapp:agua'
				})
			});

			this.hide();
		},
		onRender: function(){
			this.dom.content = this.$el.find('.modal');
		},
		onShow: function(){
			//HTMLModal.prototype.onShow.call(this);
			this.bounceInUp();
		}
	});
});