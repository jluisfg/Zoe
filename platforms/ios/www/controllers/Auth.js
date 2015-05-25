/* globals define, CryptoJS, _, Parse, User, Backbone, ActivityIndicator, facebookConnectPlugin */
define(function(require) {
    'use strict';

    var Controller = require('Controller');
    var config = require('config');
    var Signup = require('AuthSignup');
    var Login = require('AuthLogin');

    //Require crypto library
    require('sha3');

    /**
     * Index Controller
     *
     * Provides authentication options:
     * - Facebook
     * - Login (Parse)
     * - Signup
     */
    return Controller.extend({
        id: 'index-page',
        template: require('templates/index'),
        hideFx: 'fadeOut',
        showFx: 'fadeIn',
        events: (function() {
            var events = _.extend({}, Controller.prototype.events, {
                'tap #facebook': 'facebook',
                'tap #authLogin': 'login',
                'tap #authSignup': 'signup'
            });

            return events;
        })(),
        initialize: function(){
            Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

            return this.render();
        },
        onRender: function() {
            navigator.splashscreen.hide();
        },
        onMe: function(response) {
            var data = {
                email: response.email,
                username: response.email.toLowerCase(),
                password: CryptoJS.SHA3(response.email.toLowerCase()).toString(),
                firstName: response.first_name || '',
                lastName: response.last_name || '',
                fullName: response.name || '',
                gender: response.gender || '',
                facebook: true,
                settings: {
                    consumptionType: 'weight'
                }
            };

            //Atempt saving the user
            var model = Parse.Object.extend({className: '_User'});
			var query = new Parse.Query(model);

			query.equalTo('username', data.username);
			query.count({
				success: function(count){
					if(count){
						User.logIn(
							data.username,
							data.password,
							{
								success: this.onFBLoginSuccess.bind(this),
								error: this.onError.bind(this)
							}
						);
					}else{
						var user = new User();
						user.set(data)
							.signUp(null, {
								success: this.onFBSignupSuccess.bind(this),
								error: this.onError.bind(this)
							});
					}
				}.bind(this),
				error: this.onError.bind(this)
			});
        },
        onFBLoginSuccess: function(){
            ActivityIndicator.hide();
            //Reset form
            this.bounceOutRight();
            Backbone.trigger('user:login');
        },
        onFBSignupSuccess: function() {
            ActivityIndicator.hide();
            //Reset form
            this.bounceOutRight();
            Backbone.trigger('user:login', true);
        },
        onFBError: function() {
            ActivityIndicator.hide();
            this.onError(null, {message: 'No hemos podido iniciar sesion con Facebook, por favor intenta de nuevo.'});
        },
        onError: function() {
            ActivityIndicator.hide();
            Controller.prototype.onError.apply(this, Array.prototype.slice.call(arguments));
        },
        facebook: function() {
            if (!this.online) {
                this.offlineError();
                return;
            }

            var me = function() {
                try{
                    ActivityIndicator.show('Autenticando');
                    facebookConnectPlugin.api(
                        '/me',
                        config.FB.DEFAULT_PERMISSION, 
                        this.onMe.bind(this),
                        this.onFBError.bind(this)
                    );
                }catch(e){
                    console.log(e, e.message, e.stack);
                }
                
            }.bind(this);
            //Ask for authorization
            facebookConnectPlugin.login(config.FB.DEFAULT_PERMISSION, me, this.onFBError.bind(this));
        },
        login: function(){
            this.bounceOutLeft();

            if(this.views.login){
                this.views.login.show();
            }else{
                this.views.login = new Login().show();
            }

            this.listenToOnce(this.views.login, 'hide', this.bounceInLeft.bind(this));
        },
        signup: function(){
            this.bounceOutLeft();

            if(this.views.signup){
                this.views.signup.show();
            }else{
                this.views.signup = new Signup().show();
            }

            this.listenToOnce(this.views.signup, 'hide', this.bounceInLeft.bind(this));
        }
    });
});