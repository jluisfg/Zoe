/* globals define */
define('mixins', function(require){
	'use strict';
	
	var _ = require('underscore');

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}

	_.mixin({ 'capitalize': capitalize });
});