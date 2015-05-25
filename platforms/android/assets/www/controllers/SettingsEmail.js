/* globals define, User, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller = require('Controller');

	return Controller.extend({
		id: 'settings-email-page',
		template: require('templates/settings_email'),
		title: 'Cambiar Correo',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			//Get username
			this.data.email = User.current().get('email');

			this.render();
		},
		onRender: function(){
			this.dom.email = this.$el.find('#email');
		},
		onShow: function(){
			this.dom.email.val(User.current().get('email'));

			this.bounceInRight();
		},
		hide: function(){
			this.bounceOutRight();
			this.trigger('hide');
		},
		submit: function(e){
			try{
				if(e && e.preventDefault){
					e.preventDefault();
				}

				if(!this.online){
					this.offlineError();
					return;
				}

				var email = this.dom.email.val();

				if(!email || !email.length){
					throw new Error('Por favor introduce to correo electronico.');
				}else if(email === this.data.email){
					throw new Error('Ese es tu correo actual, no hay necesidad de guardarlo de nuevo.');
				}

				ActivityIndicator.show('Guardando');
				User.current()
					.save('email', email)
					.then(this.onSuccess.bind(this))
					.fail(this.onError.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			ActivityIndicator.show('Tu correo ha sido actualizado.');
			setTimeout(ActivityIndicator.hide.bind(window), 2000);
		}
	});
});