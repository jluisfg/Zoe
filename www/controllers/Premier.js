/* globals define, _ */
define(function(require){
	'use strict';

	var Controller = require('Root');
	var Modal = require('PremierInformation');

	return Controller.extend({
		id: 'premier-page',
		template: require('templates/premier'),
		title: 'Zoé Water Premier',
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #information': 'info'
			});

			return events;
		})(),
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		info: function(){
			if(!this.online){
				this.onError(null, {message: 'Es necesario contar con una conexion a internet para poder pedir informacion.'});
				return;
			}
			if(this.views.information){
				this.views.information.show();
			}else{
				this.views.information = new Modal().show();
			}
			
			this.listenToOnce(this.views.information, 'hide', this.onShow.bind(this));
		}
	});
});