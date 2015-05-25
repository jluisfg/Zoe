/* globals define, Parse */
define(['models/Entry', 'config'], function(Model, config){
	'use strict';
	
	return Parse.Collection.extend({
		model: Model,
		query: (new Parse.Query(Model)).descending('createdAt').limit(config.BLOG.LIMIT)
	});
});