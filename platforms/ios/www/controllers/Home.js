/* globals define, _, Backbone, User, aspect, Parse, ActivityIndicator  */
define(function(require){
	'use strict';

	require('polyfill');
	require('jquery');
	require('progressCircle');

	var Controller = require('Root');
	var HTMLModal  = require('HTMLModal');
	var template = require('templates/home');
	var Journal = require('models/Journal');
	var Stats = require('Stats');
	var Tips = require('Tips');
	var Settings = require('Settings');
	var ConsumptionSettings = require('SettingsConsumption');
	var config = require('config');
	
	var Index = Controller.extend({
		id: 'home-page',
		template: template,
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #track': 'track',
				'tap #share': 'share',
				'tap #stats': 'stats',
				'tap #tips':  'tips'
			});

			return events;
		})(),
		consumption: 0,
		wasOffline: false,
		title: '',
		initialize: function(){
			//Initialize main class
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
			//Add model listeners
			this.addListeners();
			//get goal
			this.data.goal =  this.model.getGoal() + ' litros';
			this.data.username = this.model.get('firstName') ? this.model.get('firstName') : this.model.get('username');

			//Listen for deletion of last consumption
			Backbone.on('journal:deletelast', this.updateJournal, this);
			Backbone.on('journal:update', this.updateJournal, this);
			Backbone.on('home:reload', this.reload, this);
			Backbone.on('user:consumption:successs', this.checkStatus, this);
			Backbone.on('tips:open', this.tips, this);

			//Setup drink and midnight watchers
			this._setupWatchers();

			aspect.add(this, ['bounceInLeft', 'bounceInRight'], this.onShow.bind(this), 'after');

			return this.render();
		},
		addListeners: function(){
			this.model = User.current();
			
			//Listen for model changes
			if(this.model){
				this.listenTo(this.model, 'change:weight', this.onWeightChange, this);
				this.listenTo(this.model, 'change:username', this.onUsernameChange, this);
				this.listenTo(this.model, 'change:lastConsumption', this.onConsumptionChange, this);
			}
		},
		empty: function(){
			this.$el.empty();
			this.stopListening(this.model);
			this.model = null;
			this._clearWatchers();
			this.data = {};
			this.consumption = null;
		},
		reload: function(){
			this.empty();
			this.addListeners();
			//get goal
			this.data.goal =  this.model.getGoal() + ' litros';
			this.data.username = this.model.get('firstName') ? this.model.get('firstName') : this.model.get('username');
			this.consumption = 0;
			//Setup drink and midnight watchers
			this._setupWatchers();
			//Re-render
			this.render().show();
		},
		updateJournal: function(){
			ActivityIndicator.hide();
			ActivityIndicator.show('Actualizando tu Consumo');
			//Get Journal data
			this.model.getJournal()
				.then(this.onJournal.bind(this))
				.fail(this.onJournalError.bind(this));
		},
		onRender: function(){
			this.dom.username = this.$el.find('#username');
			this.dom.percentage = this.$el.find('#percentage');
			this.dom.goal = this.$el.find('#goal');
			this.dom.circle = this.$el.find('#circle');
			//Fake buttons
			this.dom.settings = this.$el.find('#settings');
			this.dom.weight = this.$el.find('#weight');
			this.dom.audio = this.$el.find('#confirmation-audio');

			if(this.online){
				//Update current journal
				this.updateJournal();
			}else{
				this._updateConsumptionUI(0);
			}

			navigator.splashscreen.hide();
		},
		onRightButton: function(){
			if(!this.online){
				this.onError(null, {message: 'Necesitas de con una conexion a internet para poder usar el panel de configuracion.'});
				return;
			}

			Backbone.trigger('header:hide');
			this.bounceOutLeft();

			if(this.views.settings){
				this.views.settings.show();
			}else{
				this.views.settings = new Settings().show();
			}

			this.listenToOnce(this.views.settings, 'hide', this.bounceInLeft.bind(this));
		},
		onBeforeHide: function(){
			if(this.views){				
				if(this.views.tips){
					if(this.views.tips.$el.is(':visible')){
						this.stopListening(this.views.tips);
						this.views.tips.hide();	
					}

					Controller.prototype.hide.call(this.views.tips);
				}
				if(this.views.stats){
					if(this.views.stats.$el.is(':visible')){
						this.stopListening(this.views.stats);
						this.views.stats.hide();	
					}

					Controller.prototype.hide.call(this.views.stats);
				}
			}
		},
		track: function(){
			if(!this.online){
				this.offlineError();
				return;
			}

			if(!this.model.get('weight')){
				navigator.notification.confirm(	
					'Necesitas escribir tu peso para poder generar consumo',
					this.onChangeConsumptionType.bind(this),
					'¡Hey!',
					['Hacerlo','Despues']
				);
			}else{
				if(!this.modal){
					this.modal = new CheckModal();
				}

				this.modal.show();

				this.listenToOnce(this.modal, 'hide', this.onShow.bind(this));
			}
		},
		share: function(message){
			if(!this.online){
				this.offlineError();
				return;
			}

			var m = 'Mi meta de hoy son ' + this.model.getGoal() + ' litros, hoy he completado el ' + this.consumption + '% de mi hidratación diaria. #Alcalinizate';
			
			//if(_.isString(message)){
			//	m = message;
			//}

			window.plugins.actionsheet.show(config.SHARE.DEFAULT, function(option){
				switch(option){
				case 1: window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(m, null, "http://a.pgtb.me/LwfWX3", "Has click aquí para pegar el mensaje generado por el App de Zoé"); break;
				case 2: window.plugins.socialsharing.shareViaTwitter(m, null, "http://a.pgtb.me/NKSkxJ"); break;
				}
			});
		},
		playConfirmation: function() {
			this.dom.audio[0].play();
		},
		stats: function(){
			if(!this.online){
				this.offlineError();
				return;
			}

			ActivityIndicator.show('Cargando Estadísticas');

			this.model.getStats()
				.then(function(computed){
					ActivityIndicator.hide();
					//Create and show stats modal
					if(this.views.stats){
						this.views.stats.update(computed).show();
					}else{
						this.views.stats = new Stats({
							days: computed
						}).show();
					}
					//Reconfigure navigation bar
					this.listenToOnce(this.views.stats, 'hide', this.onShow.bind(this));
				}.bind(this))
				.fail(function(error){
					ActivityIndicator.hide();
					this.onError(null, error);
				}.bind(this));
		},
		tips: function(){
			if(!this.online){
				this.offlineError();
				return;
			}

			ActivityIndicator.show('Cargando Tips');

			var tipsQuery = new Parse.Query('Tip');

			tipsQuery.descending('createdAt');
			tipsQuery
				.find()
				.then(function(tips){
					tips = tips.map(function(t){return t.toJSON();});

					ActivityIndicator.hide();
					if(this.views.tips){
						this.views.tips.update(tips).show();
					}else{
						this.views.tips = new Tips({
							tips: tips
						}).show();
					}

					this.listenToOnce(this.views.tips, 'hide', this.onShow.bind(this));
				}.bind(this))
				.fail(function(error){
					ActivityIndicator.hide();
					this.onError(null, error);
				}.bind(this));
		},
		checkStatus: function(){
			if(this.wasOffline){
				this.updateJournal();
				this.wasOffline = false;
			}
		},
		onUsernameChange: function(){
			this.dom.username.text(this.model.get('username'));
		},
		onChangeConsumptionType: function(y){
			if(y){
				this.bounceOutLeft();

				if(this.views.weightView){
					this.views.weightView.show();
				}else{
					this.views.weightView = new ConsumptionSettings().show();
				}

				this.listenToOnce(this.views.weightView, 'hide', this.bounceInLeft.bind(this));
			}
		},
		onWeightChange: function(){
			this.dom.goal.text(this.model.getGoal());
			this.updateJournal();
		},
		onConsumptionChange: function(model, lastConsumption){
			var consumption = lastConsumption.get('consumption')/1000;
			var goal = this.model.getGoal();
			var percentage = Math.floor((consumption/goal)*100);
			var currentText = this.dom.percentage.text();
			var current = (currentText === '0') || _.isEmpty(currentText) ? 0 : parseInt(currentText, 10);
			var total = current + percentage;

			this._updateConsumptionUI(total);

			if(this.consumption >= 100){
				setTimeout(function(){
					navigator.notification.alert('Lograste tu meta de hoy', _.noop, '¡Felicidades!');
				}, 1);
			}

			this.playConfirmation();
			
		},
		onJournal: function(milltrs){
			try{
				ActivityIndicator.hide();

				var liters = parseFloat((milltrs/1000).toFixed(2), 10);
				var goal = this.model.getGoal();
				var total = Math.floor((liters/goal)*100) || 0;

				this._updateConsumptionUI(total);
			}catch(e){
				this.onError(null, e);
			}
			
		},
		onJournalError: function(error){
			ActivityIndicator.hide();
			this.onError(null, error);
		},
		onDestroy: function(){
			this.stopListening(this.model);
			this._clearWatchers();
			this.consumption = null;
			this.data = null;

			_.invoke(this.views, Backbone.View.prototype.destroy);
			this.views = null;

			aspect.remove(this, ['bounceInLeft', 'bounceInRight'], this.onShow.bind(this), 'after');
		},
		onOffline: function(){
			Controller.prototype.onOffline.call(this);

			this.wasOffline = true;
		},
		_clearWatchers: function(){
			clearTimeout(this.noonWatcher);
			clearTimeout(this.afternoonWatcher);
			clearTimeout(this.midnightWatcher);

			this.noonWatcher = null;
			this.afternoonWatcher = null;
			this.midnightWatcher = null;
		},
		_setupWatchers: function(){
			//Setup drink watchers
			var noonWatcher = new Date();
			noonWatcher.setHours(12,0,0,0);

			var afternoonWatcher = new Date();
			//afternoonWatcher.setHours(18,0,0,0);
			afternoonWatcher.setHours(18,0,0,0);

			var midnightWatcher = new Date();
			midnightWatcher.setHours(23,59,59,59);

			var now = new Date();
			var tillMidnight = midnightWatcher - now;
			//var pushData = {badge: 1, sound: 'audio/confirmation/wav'};

			if(now < noonWatcher){
				this.noonWatcher = setTimeout(function(){
					if(this.consumption < 50){
						navigator.notification.alert('Solo has consumido el ' + this.consumption + '% de tu hidratación diaria :(', _.noop, '¡Hey!');
					}
				}.bind(this), noonWatcher - now);
			}

			if(now < afternoonWatcher){
				this.afternoonWatcher = setTimeout(function(){
					if(this.consumption < 75){
						navigator.notification.alert('Solo has consumido el ' + this.consumption + '% de tu hidratación diaria :(', _.noop, '¡Hey!');
					}
				}.bind(this), afternoonWatcher - now);
			}
			//Reload home page layout after midnight
			if(tillMidnight > 1000*60){
				this.midnightWatcher = setTimeout(function(){
					this.playConfirmation();
					navigator.notification.alert('El día ha terminado y completaste el ' + this.consumption + '% de tu hidratación.', _.noop, '¡Hey!');
					Backbone.history.navigate('#home', {trigger: true});
				}.bind(this), tillMidnight);
			}
		},
		_updateConsumptionUI: function(total){
			total = total || 0;
			var totalLabel = total ? total : '0';

			this.consumption = total;

			this.dom.circle.circleProgress({
				value: parseFloat(total/100, 10),
				startAngle: -Math.PI/2,
				thickness: 30,
				size: 220,
				animation: {
					duration: 3000
				},
				fill: {
					gradient: ['rgb(27,166,217)', 'rgb(95,189,49)']
				}
			});
			this.dom.percentage.text(totalLabel);
		}
	});
	
	var CheckModal = HTMLModal.extend({
		events: (function () {
			var events = _.extend({}, HTMLModal.prototype.events, {
				'tap .check': 'save',
				'tap #deleteLast': 'deleteLast'
			});

			return events;
		})(),
		template: require('templates/home_modal_check'),
		initialize: function(){
			HTMLModal.prototype.initialize.apply(this, arguments);

			return this;
		},
		save: function(e){
			try{
				var value = $(e.currentTarget).attr('data-value');
				var type = parseInt(value, 10);
				var consumption = new Journal({consumption: type});

				ActivityIndicator.show('Guardando tu Consumo');

				//Save selected consumption
				consumption.save()
					.then(function(){
						var user = User.current();
						var journals = user.relation('journal');

						journals.add(consumption);
						user.set('lastConsumption', consumption);

						user
							.save()
							.then(function(){
								this.onSuccess();
							}.bind(this), function(error){
								this.onError(null, error);
							}.bind(this));
					}.bind(this), function(error){
						this.onError(null, error);
					}.bind(this));
			}catch(e){
				this.onError(null, e);
			}
		},
		deleteLast: function(){
			var user = User.current();
			var lastConsumption = user.get('lastConsumption');

			if(lastConsumption && lastConsumption.id){
				lastConsumption.destroy()
					.then(this.onDeleteLast.bind(this))
					.fail(this.onDeleteLastError.bind(this));
			}
		},
		onDeleteLast: function(){
			this.dom.deleteLast.prop('disabled', true);
			Backbone.trigger('journal:deletelast');
			this.hide();
		},
		onDeleteLastError: function(error){
			switch(error.code){
			case 101:
				error.message = 'Solo puedes borrar el último consumo capturado.';
				break;
			}

			this.onError(null, error);
		},
		onRender: function(){
			this.dom.deleteLast = this.$el.find('#deleteLast');
		},
		onShow: function(){
			HTMLModal.prototype.onShow.call(this);

			var user = User.current();
			var lastConsumption = user.get('lastConsumption');

			if(lastConsumption && lastConsumption.id){
				this.dom.deleteLast.removeAttr('disabled');
			}
		},
		onSuccess: function(){
			ActivityIndicator.hide();
			ActivityIndicator.show('Consumo Guardado');
			setTimeout(function(){
				ActivityIndicator.hide();
				Backbone.trigger('user:consumption:successs');
			}, 2000);
			this.hide();
		},
		onError: function(model, error){
			ActivityIndicator.hide();
			Controller.prototype.onError.call(this, null, error);
		}
	});

	return Index;
});