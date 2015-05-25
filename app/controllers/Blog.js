/* globals define, _, Backbone, Parse, ActivityIndicator */
define(function(require){
	'use strict';

	var Controller  = require('Root');
	var Detachable  = require('Detachable');
	var Blog        = require('collections/Blog');
	var config      = require('config');
	var BlogEntry   = require('BlogEntry');

	var Index = Controller.extend({
		id: 'blog-page',
		template: require('templates/blog'),
		title: 'Blog',
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'drag #entries': 'checkPosition',
				'release #entries': 'onTouchEnd'
			});

			return events;
		})(),
		page: 0,
		totalPages: 0,
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			this.collection = new Blog();
			this.entries = {};
			this.views.blog = new BlogEntry();

			//Listen for images collection
			this.listenTo(this.collection, 'reset', this.addAll.bind(this));
			this.listenTo(this.collection, 'error', this.onError.bind(this));

			Backbone.on('blog:entry:show', this.onEntry, this);

			return this.render();
		},
		countEntries: function(){
			var model = Parse.Object.extend('Blog');
			var query = new Parse.Query(model);

			ActivityIndicator.show('Cargando');
			query.count().then(function(count){
				var totalPages = Math.ceil(count/config.BLOG.LIMIT);
				if(totalPages){
					this.totalPages = totalPages;
					this.getEntries();
				}
			}.bind(this)).fail(this.onError.bind(this));
		},
		onRender: function(){
			this.dom.entries = this.$el.find('#entries');
			this.dom.entryButton = this.$el.find('#entry');
			this.dom.indicator = this.$el.find('.ion-infinite-scroll');

			if(this.online){
				this.countEntries();
			}else{
				this.onContentError({message: 'No hay conexion a internet.'});
			}
		},
		getEntries: function(){
			//Paginate
			if(this.page >= 0){
				this.collection.query.skip(this.page*config.BLOG.LIMIT);
			}

			this.collection.fetch();
		},
		onRightButton: function(){
			if(this.online){
				this.removeAll();
				//Reset pagination
				this.page = 0;
				this.totalPages = 0;
				$('#blogEnd').remove();
				this.$el.removeClass('end-reached');
				this.countEntries();
			}else{
				this.offlineError();
			}
		},
		addAll: function(){
			this.page++;
			if(!this.dom.entries.find('.entry').length){
				this.dom.entries.empty();
			}

			if(this.$el.hasClass('scrolling')){
				this.$el.removeClass('active scrolling');
				this.dom.indicator.removeClass('active');
			}

			if(this.page === this.totalPages){
				this.$el.addClass('end-reached');
				this.dom.entries.after('<div id="blogEnd" class="infinite-scroll-end">No hay mas entradas en el blog.</div>');
			}

			if(this.collection.length){
				this.collection.each(this.addOne.bind(this));

				//Call show on all images
				_.invoke(this.entries, Entry.prototype.show);
			}else{
				this.onContentError({message: 'No hay publicaciones en el blog.'});
			}

			ActivityIndicator.hide();
		},
		removeAll: function(){
			_.invoke(this.entries, Entry.prototype.destroy);
			_.each(this.entries, function(i){
				i = null;
			});
			this.entries = {};
		},
		addOne: function(model){
			var view = new Entry({
				model: model,
				appendTo: this.dom.entries
			});

			this.entries[view.cid] = view;

			return this;
		},
		onEntry: function(data){
			Backbone.trigger('header:hide');
			this.bounceOutLeft();

			this.views.blog.update(data).show();

			this.listenToOnce(this.views.blog, 'hide', this.bounceInLeft.bind(this));
		},
		onTouchEnd: function(){
			if(this.$el.hasClass('scrolling')){
				this.$el.addClass('active');
				this.getEntries();
			}
		},
		checkPosition: function(e){
			if((this.totalPages <= 1) || (this.page === this.totalPages) || this.$el.hasClass('end-reached')) {
				return false;
			}else{
				Controller.prototype.checkPosition.call(this, e);
			}
		}
	});

	var Entry = Detachable.extend({
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		className: 'card list entry',
		template: require('templates/blog_entry_item'),
		events: {
			'tap': 'entry'
		},
		initialize: function(){
			Detachable.prototype.initialize.apply(this, arguments);

			this.render();
		},
		render: function(){
			this.$el.html(this.template({data: this.model.toJSON()}));

			this.$el.hammer();
			
			return this;
		},
		entry: function(){
			Backbone.trigger('blog:entry:show', this.model.toJSON());
		}
	});

	return Index;
});