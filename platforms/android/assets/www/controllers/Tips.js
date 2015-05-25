/* globals define, Backbone, _ */
define(function(require){
	'use strict';

	var Detachable = require('Detachable');
	var Controller = require('Controller');
	var Tip = Backbone.Model.extend({
		defaults: {
			text: '',
			title: '',
			toggle: false
		}
	});
	var Tips = Backbone.Collection.extend({model: Tip});
	var TipView = Detachable.extend({
		className: 'item item-dark',
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		template: require('templates/tips_item'),
		events: {
			'tap': 'toggle'
		},
		initialize: function(options){
			Detachable.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			if(!options || !options.model){
				this.model = new Tip();
			}

			this.listenTo(this.model, 'change:toggle', this.onToggle);

			return this.render();
		},
		render: function(){
			this.$el.append(this.template({data: this.model.toJSON()}));
			return this;
		},
		toggle: function(){
			var currentToggled = this.model.collection.filter(function(t){return t.get('toggle');});

			if(currentToggled){
				currentToggled.forEach(function(c){c.set('toggle', false);});
			}

			this.model.set('toggle', !this.model.get('toggle'));
		},
		onToggle: function(model, toggled){
			if(toggled){
				this.$el.addClass('toggled');
			}else{
				this.$el.removeClass('toggled');
			}
		}
	});
	var template = require('templates/tips');

	return Controller.extend({
		id: 'tips-page',
		template: template,
		title: 'Tips',
		currentLabel: '',
		initialize: function(options){
			Controller.prototype.initialize.apply(this, arguments);

			this.collection = new Tips();

			if(options.tips){
				this.collection.reset(options.tips);
			}

			this.listenTo(this.collection, 'reset', this.addAll, this);

			return this.render();
		},
		update: function(days){
			this.collection.reset(days);

			return this;
		},
		hide: function(){
			this.bounceOutDown();
			this.trigger('hide');
		},
		onRender: function(){
			this.dom.items = this.$el.find('#tips');
		},
		onShow: function(){
			this.bounceInUp();
			this.addAll();
		},
		addAll: function(){
			this.removeAll();

			this.collection.each(this.addOne.bind(this));
			_.invoke(this.views, TipView.prototype.show);
			//Select first elements
			this.dom.items.find('.item:first-child').trigger('tap');
		},
		removeAll: function(){
			_.each(this.views, function(v){
				v.destroy();
				v = null;
			});
			this.views = {};

			return this;
		},
		addOne: function(model){
			var view = new TipView({
				model: model,
				appendTo: this.dom.items
			});
			this.views[view.cid] = view;
		}
	});
});