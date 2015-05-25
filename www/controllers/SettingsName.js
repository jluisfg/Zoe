/* globals define, User, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller = require('Controller');

	return Controller.extend({
		id: 'settings-name-page',
		template: require('templates/settings_name'),
		title: 'Cambiar Nombre',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			//Get username
			this.data.username = User.current().get('username');

			this.render();
		},
		onRender: function(){
			this.dom.name = this.$el.find('#username');
		},
		onShow: function(){
			this.dom.name.val(User.current().get('username'));

			this.bounceInRight();
		},
		onLeftButton: function(){
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

				var name = this.dom.name.val();

				if(!name || !name.length){
					throw new Error('Por favor introduce tu nombre de usuario.');
				}else if(name === this.data.username){
					throw new Error('Ese es tu nombre de usuario actual, no hay necesidad de guardarlo de nuevo.');
				}

				ActivityIndicator.show('Guardando');
				User.current()
					.save('username', name)
					.then(this.onSuccess.bind(this))
					.fail(this.onError.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			ActivityIndicator.show('Tu nombre de usuario se ha actualizado.');
			setTimeout(ActivityIndicator.hide.bind(window), 2000);
		}
	});
});