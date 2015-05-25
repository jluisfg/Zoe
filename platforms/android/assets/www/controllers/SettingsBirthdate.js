/* globals define, User, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var moment = require('moment');

	require('moment.locale');

	return Controller.extend({
		id: 'settings-birthdate-page',
		template: require('templates/settings_birthdate'),
		title: 'Cambiar Fecha de Nacimiento',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
			
			this.data.birthdate = moment(User.current().get('birthdate')).format('L');

			this.render();
		},
		onRender: function(){
			this.dom.date = this.$el.find('#birthdate');
			this.dom.birthdate = this.$el.find('#currentBirthdate');
		},
		onShow: function(){
			this.dom.birthdate.val(moment(User.current().get('birthdate')).format('L'));

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

				var birthdate = this.dom.date.val();

				if(!birthdate){
					throw new Error('Por favor introduce tu fecha de nacimiento.');
				}else if(!moment(birthdate).isValid()){
					throw new Error('Por favor introduce una fecha de nacimiento valida.');
				}

				ActivityIndicator.show('Guardando');
				User.current()
					.save('birthdate', new Date(birthdate))
					.then(this.onSuccess.bind(this))
					.fail(this.onError.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			ActivityIndicator.show('Tu fecha de nacimiento ha sido actualizada.');
			this.dom.birthdate.html(moment(User.current().get('birthdate')).format('L'));
			setTimeout(ActivityIndicator.hide.bind(window), 2000);
		}
	});
});