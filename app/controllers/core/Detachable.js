/* global define */
define(['underscore', 'jquery', 'backbone', 'aspect'], function(_, $, Backbone, aspect){
	'use strict';
	
	return Backbone.View.extend({
		appendTo: 'body',
		append: 'appendTo',
		showFx: 'show',//What do you want to do to show it? show, fadeIn
		hideFx: 'hide',//What do you want to do to hide it? hide, fadeOut
		initialize: function(options){

			if(options){
				if(options.appendTo){
					this.appendTo = options.appendTo;
				}

				if(options.showFx){
					this.showFx = options.showFx;
				}

				if(options.hideFx){
					this.hideFx = options.hideFx;
				}

				if(options.prepend){
					this.append = 'prependTo';
				}
			}

			aspect.add(this, 'show', this.onShow.bind(this), 'after');
			aspect.add(this, 'hide', this.onHide.bind(this), 'after');
			aspect.add(this, 'render', this.onRender.bind(this), 'after');

			aspect.add(this, ['bounceOutLeft', 'bounceOutRight', 'bounceOutDown'], this.headersFadeOut.bind(this));
			aspect.add(this, ['bounceInLeft', 'bounceInRight', 'bounceInUp'], this.headersFadeIn.bind(this), 'after');

			Backbone.View.prototype.initialize.apply(this, arguments);
		},
		render: function(){},//Implement yours
		hide: function(){
			try{
				this.$el[this.hideFx](this._detach.bind(this));
				this.trigger('hide');
			}catch(e){
				console.log('An error occurred while hiding the view', e, e.message, e.stack);
			}

			return this;
		},
		show: function(){
			try{
				if(!this.isAttached()){
					this.$el.hide();
					this._append();
				}
				this.$el[this.showFx]();
				this.trigger('show');
			}catch(e){
				console.log('An error occurred while showing the view', e, e.message, e.stack);
			}

			return this;
		},
		isAttached: function(){
			return !!this.$el.parent().length;
		},

		_append: function(){
			try{
				this.$el[this.append](this.appendTo);
				//TODO: don't remove the loading label here, do it in the controller(s)
				if(this.$el.parent().hasClass('loading')){
					this.$el.parent().removeClass('loading');
					this.$el.parent().find('#app-loading-label').remove();
				}

				this.delegateEvents();
			}catch(e){
				console.log('FATAL: Detachble view requires a defined appendTo attribute', e.name, e.stack);
			}
			
		},

		_detach: function(){
			this.$el.detach();
		},
		//Implement yours
		onShow: function(){},
		onHide: function(){},
		onRender: function(){},
		headersFadeOut: function(){
			if(this.dom.headers){
				this.dom.headers.fadeOut();
			}
		},
		headersFadeIn: function(){
			if(this.dom.headers){
				this.dom.headers.fadeIn();
			}
		},
		bounceOutLeft: function(){
			this.dom.content.addClass('bounceOutLeft animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceOutLeft animated').addClass('hide');
				this.$el.hide();
			}.bind(this), 1000);

			return this;
		},
		bounceInLeft: function(){
			this.$el.show();
			this.dom.content.removeClass('hide').addClass('bounceInLeft animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceInLeft animated');
			}.bind(this), 1000);

			return this;
		},
		bounceInRight: function(){
			this.$el.show();
			this.dom.content.removeClass('hide').addClass('bounceInRight animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceInRight animated');
			}.bind(this), 1000);

			return this;
		},
		bounceOutRight: function(){
			this.dom.content.addClass('bounceOutRight animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceOutRight animated').addClass('hide');
				this.$el.hide();
			}.bind(this), 1000);

			return this;
		},
		bounceInUp: function(){
			this.$el.show();
			this.dom.content.removeClass('hide').addClass('bounceInUp animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceInUp animated');
			}.bind(this), 1000);

			return this;
		},
		bounceOutDown: function(){
			this.dom.content.addClass('bounceOutDown animated');
			_.delay(function(){
				this.dom.content.removeClass('bounceOutDown animated').addClass('hide');
				this.$el.hide();
			}.bind(this), 1000);

			return this;
		}
	});
});