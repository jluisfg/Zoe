/* globals define, _, Parse, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var template = require('templates/premier_modal_information');

	return Controller.extend({
		id: 'premier-information-page',
		template: template,
		title: 'Información',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		hide: function(){
			this.bounceOutDown();
			this.trigger('hide');
		},
		onRender: function(){
			this.dom.form = this.$el.find('form');
			this.dom.name = this.$el.find('#name');
			this.dom.email = this.$el.find('#email');
			this.dom.phone = this.$el.find('#phone');
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			this.dom.form.trigger('reset');
			navigator.notification.alert('Nos podremos en contacto contigo', _.noop, '¡Gracias!');
		},
		onShow: function(){
			this.bounceInUp();
		},
		submit: function(e){
			try{
				ActivityIndicator.show('Enviando');

				if(e && e.preventDefault){
					e.preventDefault();
				}

				var name = this.dom.name.val();
				var email = this.dom.email.val();
				var phone = this.dom.phone.val();

				if(!name || !email || !phone){
					throw new Error('Todos los campos son obligatorios, por favor intente de nuevo.');
				}

				Parse.Cloud
					.run('contact', {name: name, email: email, phone: phone})
					.done(this.onSuccess.bind(this))
					.fail(this.onError.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		}
	});
});