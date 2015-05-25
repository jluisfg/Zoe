/* globals define, _ */
define(function(require){
	'use strict';

	var Controller = require('Controller');
	var Entry = require('models/Entry');

	return Controller.extend({
		id: 'blog-entry-page',
		template: require('templates/blog_entry'),
		title: 'Blog',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			this.model = new Entry();
			this.listenTo(this.model, 'change', this.update, this);

			return this.render();
		},
		clear: function(){
			this.$el.empty();
			this.render();
		},
		update: function(data){
			//Hero image URL
			var src = data.image && data.image.url ? data.image.url : 'images/blog_placeholder.jpg';

			this.dom.entryTitle.html(_.escape(data.title));
			this.dom.img.attr('src', src);

			this.dom.body.html(data.contentEncoded);

			if(data.link){
				this.dom.source.attr('href', data.link);
			}else{
				this.dom.source.hide();
			}
			return this;
		},
		hide: function(){
			this.bounceOutRight();
			this.trigger('hide');
		},
		onShow: function(){
			this.bounceInRight();
		},
		onRender: function(){
			this.dom.entryTitle = this.$el.find('#title');
			this.dom.img = this.$el.find('#hero');
			this.dom.body = this.$el.find('#body');
			this.dom.source = this.$el.find('#source');
		}
	});
});