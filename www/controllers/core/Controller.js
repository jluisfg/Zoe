/* global define, Backbone, _, aspect, ActivityIndicator, navigator */
define(function(require){
	'use strict';

	var Detachable = require('Detachable');
	var $          = require('jquery');

	require('hammerjs');
	require('jqueryhammer');
	require('mixins');

	var Controller = Detachable.extend({
		id: 'Must set controller id',
		className: 'ionic-body',
		template: require('templates/page'),
		errorTemplate: require('templates/page_error'),
		compiledTemplate: '',
		title: 'Default title',
		description: 'Default Description',
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		events: {
			'submit form': 'submit',
			'tap #leftButton': 'onLeftButton',
			'tap #rightButton': 'onRightButton'
		},
		mobile: true,
		online: true,
		initialize: function(){
			//Call base initialize
			Detachable.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			//Listen for app propagated networks status events
			Backbone.on('app:online', this.onOnline, this);
        	Backbone.on('app:offline', this.onOffline, this);

            //Aspect
			aspect.add(this, 'show', this.onBeforeShow.bind(this), 'before');
			aspect.add(this, 'hide', this.onBeforeHide.bind(this), 'before');
			aspect.add(this, 'submit', this.onBeforeSubmit.bind(this), 'before');
			aspect.add(this, ['onLeftButton', 'onRightButton', 'hide'], this.blur.bind(this), 'before');

			//Check for connection status
			document.addEventListener('offline', this.onOffline.bind(this), false);
			document.addEventListener('online', this.onOnline.bind(this), false);
			
			return this;
		},
		submit: function(){},
		reset: function(){
			if(this.dom && this.dom.form && this.dom.form.length){
				this.dom.form.trigger('reset');
			}
		},
		//Override whenever it makes sense
		render: function(){
			var model = this.model && this.model.attributes ? this.model.attributes : ((_.isObject(this.model) || _.isArray(this.model)) ? this.model : {});
			var collection = this.collection instanceof Backbone.Collection ? this.collection.toJSON() : ((_.isObject(this.collection) || _.isArray(this.collection)) ? this.collection : []);
			//Extend data
			var data = _.extend({
				item      : model,
				items     : collection,
				id        : this.id,
				className : this.className
			}, this.data || {});

			//Pass to the template, we must enforce the usage of this instead of custom names
			this.compiledTemplate = this.template({data: data});

			this.$el.append(this.compiledTemplate);

			this.$el.hammer();

			this.dom.title = this.$el.find('.title');
			this.dom.headers = this.$el.find('>.bar,>.tabs');
			this.dom.content = this.$el.find('.page-content');

			return this;
		},
		blur: function(){
			var $focus = this.$el.find(':focus');

			if($focus.length){
				$focus.trigger('blur');
			}
		},
		checkPosition: function(e){
			if(this.$el.hasClass('scrolling')){
				e.preventDefault();
				e.stopPropagation();
			}else if(!this.$el.hasClass('end-reached')){
				var offset = Math.abs($(e.currentTarget).offset().top);
				var wheight = $(window).height();
				var height = $(e.currentTarget).height();

				if(offset + wheight - 100 > height){
					this.$el.addClass('scrolling');
					this.dom.indicator.addClass('active');
				}
			}
		},
		onTouchEnd: function(){},
		onBeforeShow: function(){
			this.setTitle();
		},
		onBeforeHide: function(){},
		onBeforeSubmit: function(){
			this.blur();
		},
		onLayerChange: function(){},
		onLayerWillChange: function(){},
		onClose: function(){
			aspect.remove(this, 'show', this.onBeforeShow.bind(this));
			aspect.remove(this, 'show', this.onShow.bind(this), 'after');
			aspect.remove(this, 'hide', this.onBeforeHide.bind(this));
			aspect.remove(this, 'hide', this.onHide.bind(this), 'after');

			this.stopListening();
		},
		onLeftButton: function(){
			this.hide();
		},
		onRightButton: function(){},
		onError: function(model, error){
			ActivityIndicator.hide();
			_.delay(function(){
				navigator.notification.alert(this.message, _.noop, '¡Ups!');
			}.bind(error), 1);
		},
		onContentError: function(error){
			ActivityIndicator.hide();
			this.dom.content.html(this.errorTemplate({message: error.message}));
		},
		onShow: function(){},
		onOnline: function(){
			this.online = true;
			this.$el.find('#offline').removeClass('offline-ui-down');
		},
		onOffline: function(){
			this.online = false;
			this.$el.find('#offline').addClass('offline-ui-down');
		},
		offlineError: function(){
			this.onError(null, {message: '¡No hay conexión a internet! :('});
		},
		setTitle: function(t){
			var title = t || this.title;

			if(title && this.dom.title && this.dom.title.length){
				this.dom.title.text(this.title);
			}
		}
	});

	return Controller;
});