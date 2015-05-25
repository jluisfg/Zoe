/* global define, Backbone */
define(function(require){
	'use strict';

	return Backbone.View.extend({
		events: {
			'tap button[root]': 'showRootView',
			'tap #menuOverlay': 'toggle',
			'swipeup': 'toggle'
		},
		template: require('templates/menu'),
		id: 'menu',
		initialize: function(){
			Backbone.on('header:hide', this.hide, this);
			Backbone.on('header:toggle', this.toggle, this);

			return this.render();
		},
		render: function(){
			this.$el.html(this.template());

			this.$el.hammer();
		},
		showRootView: function(e){
			try{
				if(e && e.preventDefault){
					e.preventDefault();
				}

				var $target = $(e.currentTarget);
				var page = $target.attr('data-view').replace('#', '');
				var currentFragment = Backbone.history.getFragment();
				
				if(page !== currentFragment){
					Backbone.history.navigate(page, {trigger: true});
				}
				
				this.toggle();
			}catch(e){
				console.log(e, e.stack);
			}
		},
		toggle: function(){
			var $el = this.$el;
			var $overlay = $el.find('#menuOverlay');
	        var pos = $el.position().top;

	        if(pos < 0){
	          $el.animate({top: 0});
	          $overlay.show();
	        }else{
	          $el.animate({top: '-100%'});
	          $overlay.hide();
	        }
		},
		hide: function(){
			if(this.$el.position().top >=0){
				this.toggle();
			}
		}
	});
});