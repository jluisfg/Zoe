/* globals define */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var template = require('templates/tos');
	return Controller.extend({
		id: 'tos-page',
		template: template,
		title: 'Términos de uso',
		currentLabel: '',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		},
		hide: function(){
			this.bounceOutDown();
			this.trigger('hide');
		},
		onShow: function(){
			this.bounceInUp();
		}
	});
});