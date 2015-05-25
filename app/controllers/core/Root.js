/* globals define, Backbone */
define(function(require){
	'use strict';

	var Controller = require('Controller');

	return Controller.extend({
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		events: {
			'tap #leftButton': 'onLeftButton',
			'tap #headerBrand': 'onLeftButton',
			'tap #rightButton': 'onRightButton'
		},
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
		},
		toggleMenu: function(){
			Backbone.trigger('header:toggle');
		},
		onHide: function(){
			Backbone.trigger('header:hide');
		},
		onLeftButton: function(){
			Backbone.trigger('header:toggle');
		},
		onRightButton: function(){}
	});
});