/* global define, Backbone, _ */
define(function(require){
	'use strict';
	
	var template   = require('templates/modal');
	var Detachable = require('Detachable');

	//Slideshow
	var Modal = Detachable.extend({
		id: 'modal',
		className: 'modal-wrapper',
		template: template,
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		events: {
			'tap .close': 'hide',
			'tap .modal-backdrop': 'hide',
			'tap button[data-dismiss]': 'hide'
		},
		config: {
			header: null,
			body: 'DEFAULT MODAL CONTENT, IMPLEMENT YOURS',
			footer: null
		},
		initialize: function(options){
			//Extend data
			if(options && options.config && _.isObject(options.config)){
				this.config =_.extend({}, this.config, options.config);
			}
			//Initialize base class
			Detachable.prototype.initialize.apply(this, arguments);

			//Create wrapper DOM before anything else is initialized
			return this.render();
		},
		render: function(){
			var data = this.config;
			if(this.model && (this.model instanceof Backbone.Model)){
				this.config.data = _.extend({}, this.config.data, this.model.toJSON());
			}

			this.$el.html(this.template(data));

			this.dom.body = this.$el.find('.modal-body');
			this.dom.header = this.$el.find('.modal-header');
			this.dom.footer = this.$el.find('.modal-footer');

			this.$el.hammer();

			return this;
		},
		onRender: function(){},//Extend with yours
		onShow: function(){
			$('body').addClass('modal-open');
		},
		onHide: function(){
			$('body').removeClass('modal-open');
		}
	});

	return Modal;
});