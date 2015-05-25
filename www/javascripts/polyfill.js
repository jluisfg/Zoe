/* global define */
define(
	'polyfill',
	[
		'backbone',
		'Redirect'
	],
	function(Backbone, Redirect){
		'use strict';

		/** 
		* Add close method to Backbone.View's prototype
		* 
		* Unbinds events, executes onClose method if defines
		* triggers 'close' event, if desired we will remove
		* the DOM elements
		*
		* TODO: Improve removing DOM elements
		*/
		Backbone.View.prototype.close = function (remove) {
			this.unbind();

			if (this.onClose) {
				this.onClose();
			}

			this.trigger('close');

			if (remove) {
				this.remove();
				this.trigger('remove');
			}
		};

		/** 
		* Add destroy method to Backbone.View's prototype
		* 
		* Closes and removes DOM
		*/
		Backbone.View.prototype.destroy = function () {
			this.close(true);
		};

		/**
		* @override
		*
		* Add Backbone.View events replacement for mobile
		*/
		var _initialize = Backbone.View.prototype.initialize;
		Backbone.View.prototype.initialize = function(){
			//TODO: Remove this.mobile references
			this.mobile = true;//Support old code
			//Initialize default objects
			this.views = {};
			this.dom = {};
			this.data = {};
			this.mc = null;//mcHammerjs

			return _initialize.apply(this, arguments);
		};

		if(!window.ActivityIndicator){
			window.ActivityIndicator = {show: function(){}, hide: function(){}};
		}

		/**
		* Override loadUrl method
		* 
		* Kepp track of history changes, try loading the passed url
		* if any error is catched then we can easily redirect users
		* to the default error page or the defined page with a redirect
		* exception
		*/
		var originalLoadUrl = Backbone.History.prototype.loadUrl;

		Backbone.History.prototype.loadUrl = function (hash) {
			hash = hash || window.location.hash;
			//Save history referers for future usage
			window.referrer = window.referrer || {};
			window.referrer.previous = window.referrer.current;
			window.referrer.current  = hash;

			try {
				return originalLoadUrl.apply(this, arguments);
			} catch (e) {
				if (e instanceof Redirect) {
					Backbone.history.navigate(e.url, {trigger: true});
				}
				else {
					Backbone.history.navigate('#!404', {trigger: true});
					console.error(e, e.message, e.stack);
				}
			}
		};
	}
);