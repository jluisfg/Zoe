/* globals define */
define(function(require){
	'use strict';

	var Controller = require('Root');
	var template = require('templates/about');

	return Controller.extend({
		id: 'about-page',
		template: template,
		title: '¿Qué es Zoé Water?',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		}
	});
	
});