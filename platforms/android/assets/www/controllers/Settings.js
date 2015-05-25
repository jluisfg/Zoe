/* globals define, _, User, Backbone */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var TOS = require('TOS');
	var SettingsName = require('SettingsName');
	var SettingsEmail = require('SettingsEmail');
	var SettingsPassword = require('SettingsPassword');
	var SettingsWeight = require('SettingsConsumption');
	var SettingsBirthdate = require('SettingsBirthdate');

	return Controller.extend({
		id: 'settings-page',
		template: require('templates/settings'),
		title: 'Configuración',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #signout': 'signout',
				'tap #tos': 'tos',
				'tap #updateName': 'onName',
				'tap #updateEmail': 'onEmail',
				'tap #updateWeight': 'onWeight',
				'tap #updatePassword': 'onPassword',
				'tap #updateBirthdate': 'onBirthdate'
			});

			return events;
		})(),
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		onName: function(){
			this.bounceOutLeft();

			if(this.views.nameView){
				this.views.nameView.show();
			}else{
				this.views.nameView = new SettingsName().show();
			}

			this.listenToOnce(this.views.nameView, 'hide', this.bounceInLeft.bind(this));
		},
		onEmail: function(){
			this.bounceOutLeft();
			
			if(this.views.emailView){
				this.views.emailView.show();
			}else{
				this.views.emailView = new SettingsEmail().show();
			}

			this.listenToOnce(this.views.emailView, 'hide', this.bounceInLeft.bind(this));
		},
		onWeight: function(){
			this.bounceOutLeft();

			if(this.views.weightView){
				this.views.weightView.show();
			}else{
				this.views.weightView = new SettingsWeight().show();
			}

			this.listenToOnce(this.views.weightView, 'hide', this.bounceInLeft.bind(this));
		},
		onPassword: function(){
			this.bounceOutLeft();

			if(this.views.passwordView){
				this.views.passwordView.show();
			}else{
				this.views.passwordView = new SettingsPassword().show();
			}

			this.listenToOnce(this.views.passwordView, 'hide', this.bounceInLeft.bind(this));
		},
		onBirthdate: function(){
			this.bounceOutLeft();

			if(this.views.birthdateView){
				this.views.birthdateView.show();
			}else{
				this.views.birthdateView = new SettingsBirthdate().show();
			}

			this.listenToOnce(this.views.birthdateView, 'hide', this.bounceInLeft.bind(this));
		},
		onRender: function(){
			this.dom.name = this.$el.find('#updateName');
			this.dom.email = this.$el.find('#updateEmail');
			this.dom.password = this.$el.find('#updatePassword');
		},
		onShow: function(){
			if(User.current().get('facebook')){
				this.$el.addClass('settings-facebook');
				this.dom.name.addClass('hide');
				this.dom.email.addClass('hide');
				this.dom.password.addClass('hide');
			}else{
				this.$el.removeClass('settings-facebook');
				this.dom.name.removeClass('hide');
				this.dom.email.removeClass('hide');
				this.dom.password.removeClass('hide');
			}

			this.bounceInRight();
		},
		hide: function(){
			this.bounceOutRight();
			this.trigger('hide');
		},
		tos: function(){
			if(this.views.tos){
				this.views.tos.show();
			}else{
				this.views.tos = new TOS().show();
			}
		},
		signout: function(){
			User.logOut();
			this.bounceOutRight();
			Backbone.trigger('user:logout');
		}
	});
});