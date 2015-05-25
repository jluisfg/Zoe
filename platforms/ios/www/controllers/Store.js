/* globals define */
define(function(require){
	'use strict';

	var Controller = require('Root');

	return Controller.extend({
		id: 'store-page',
		template: require('templates/store'),
		title: 'Tienda',
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			return this.render();
		}
	});
});