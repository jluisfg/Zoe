/* globals define, _, User, Zoe, Backbone, Parse, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller  = require('Controller');
	var TOS = require('TOS');

	/**
	* Login Controller
	* 
	* Takes care of authenticating users with a Parse account
	*/
	return Controller.extend({
		id: 'signup-password-page',
		template: require('templates/signup_password'),
		title: '2. Crear cuenta',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #authTos': 'tos'
			});

			return events;
		})(),
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		onRender: function(){
			this.dom.password = this.$el.find('#password');
			this.dom.passwordConfirmation = this.$el.find('#passwordConfirmation');
			this.dom.form = this.$el.find('form');
		},
		onShow: function(){
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

				var prefilledData = Zoe.storage.getItem('signup_prefill');
				var password = this.dom.password.val();
				var confirmation = this.dom.passwordConfirmation.val();

				if(!_.isEmpty(prefilledData) && !_.isEmpty(password) && !_.isEmpty(confirmation) && (password === confirmation)){
					ActivityIndicator.show('Creando Cuenta');

					//Add password to the object
					prefilledData.password = password;

					var user = new User();
					user.set('username', prefilledData.username);
					user.set('email', prefilledData.email);
					user.set('password', prefilledData.password);
					user.set('settings', {consumptionType: 'weight'});
					user.set('birthdate', new Date(prefilledData.birthdate));

					var ACL = new Parse.ACL();
					ACL.setPublicReadAccess(false);
					ACL.setPublicWriteAccess(false);

					user.setACL(ACL);
					user.signUp(null, {
						success: this.onSuccess.bind(this),
						error: this.onError.bind(this)
					});
				}else{
					if(_.isEmpty(prefilledData)){

						throw new Error('NO_PREFILLED_DATA');

					}else if(_.isEmpty(password)||_.isEmpty(confirmation)){

						throw new Error('INVALIDA_DATA');

					}else if(password !== confirmation){

						throw new Error('UNMATCHING_DATA');

					}
				}
			}catch(e){
				Controller.prototype.onError.call(this, null, e);
			}
		},
		tos: function(){
			if(this.views.tos){
				this.views.tos.show();
			}else{
				this.views.tos = new TOS().show();
			}
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			//Reset form
			this.reset();
			this.bounceOutRight();
			Backbone.trigger('user:login', true);
			Zoe.storage.removeItem('signup_prefill');
		}
	});
});