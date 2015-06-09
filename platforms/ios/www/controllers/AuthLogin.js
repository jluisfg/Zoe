/* globals define, _, User, Backbone, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller  = require('Controller');
	var Forgot      = require('AuthForgot');
	
	/**
	* Login Controller
	* 
	* Takes care of authenticating users with a Parse account
	*/
	return Controller.extend({
		id: 'login-page',
		template: require('templates/login'),
		title: 'Ingresa a tu cuenta',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #forgot': 'forgot'
			});

			return events;
		})(),
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		onRender: function(){
			this.dom.username = this.$el.find('#username');
			this.dom.password = this.$el.find('#password');
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

				var u = this.dom.username.val();
				var p = this.dom.password.val();

				if(_.isEmpty(u) || _.isEmpty(p)){
					throw new Error('Por favor ingresa tus credenciales.');
				}

				ActivityIndicator.show('Autenticando');
				User.logIn(u.toLowerCase(), p)
					.then(this.onSuccess.bind(this))
					.fail(this.onError.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		},
		onError: function(error){
			switch(error.code){
			case 101:
				error.message = 'Nombre de usuario o contraseña incorrectos';
				break;
			}
			
			Controller.prototype.onError.call(this, null, error);
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			//Reset form
			this.reset();
			this.bounceOutRight();
			Backbone.trigger('user:login');
		},
		forgot: function(){
			if(this.views.forgot){
				this.hide();
				this.views.forgot.show();
				
			}else{
				this.hide();
				this.views.forgot = new Forgot().show();
				
			}
		}
	});
});