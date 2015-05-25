/* globals define, steroids */
define(function(require){
	'use strict';

	var Controller = require('Controller');

	return Controller.extend({
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		events: {
			'click #leftButton': 'onLeftButton',
			'click #rightButton': 'onRightButton',
			'submit': 'submit'
		},
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
		},
		onShow: function(){
			steroids.view.removeLoading();
		},
		onLeftButton: function(){
			setTimeout(function(){
				steroids.modal.hide();
			}, 1);
		}
	});
});