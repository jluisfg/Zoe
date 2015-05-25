/* globals define, _, Backbone, Parse, User, ActivityIndicator  */
define(function(require){
	'use strict';

	var Controller     = require('Root');
	var Detachable     = require('Detachable');
	var HTMLModal      = require('HTMLModal');
	var Images         = require('collections/Images');
	var config         = require('config');
	var File           = require('models/File');
	var Photo          = require('GalleryPhoto');

	var Gallery = Controller.extend({
		id: 'gallery-page',
		template: require('templates/gallery'),
		title: 'Galería',
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		events: (function () {
			var events = _.extend({}, Controller.prototype.events, {
				'tap #take': 'takePicture',
				'tap #grab': 'grabPicture',
				'drag #pics': 'checkPosition',
				'release #pics': 'onTouchEnd'
			});

			return events;
		})(),
		page: 0,
		totalPages: 0,
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			//Initialize collection
			this.collection = new Images();
			this.images = {};
			this.views.photo = new Photo();

			//Create upload modal
			this.views.uploadModal = new UploadModal({collection: this.collection});

			//Listen for images collection
			this.listenTo(this.collection, 'reset', this.addAll.bind(this));
			this.listenTo(this.collection, 'error', this.onError.bind(this));
			this.listenTo(this.collection, 'prepend', this.prependOne.bind(this));

			Backbone.on('gallery:image:show', this.onPicture, this);
			Backbone.on('gallery:image:prepend', this.onImageSaved, this);
			Backbone.on('gallery:image:destroy', this.onDestroyOne, this);

			return this.render();
		},
		getImages: function(){
			//Paginate
			if(this.page >= 0){
				this.collection.query.skip(this.page*config.GALLERY.LIMIT);
			}

			this.collection.fetch();
		},
		countImages: function(){
			var model = Parse.Object.extend('File');
			var query = new Parse.Query(model);

			ActivityIndicator.show('Cargando');
			query.count().then(function(count){
				var totalPages = Math.ceil(count/config.GALLERY.LIMIT);
				if(totalPages){
					this.totalPages = totalPages;
					this.getImages();
				}else{
					this.addAll();
				}
			}.bind(this)).fail(this.onError.bind(this));
		},
		onRender: function(){
			//Pics container
			this.dom.pics = this.$el.find('#pics');
			this.dom.indicator = this.$el.find('.ion-infinite-scroll');
			this.dom.tabs = this.$el.find('#tabs');

			if(this.online){
				this.countImages();
			}else{
				this.onContentError({message: 'No hay conexion a internet.'});
			}
		},
		onRightButton: function(){
			if(this.online){
				this.removeAll();
				//Reset pagination
				this.page = 0;
				this.totalPages = 0;
				$('#galleryEnd').remove();
				this.$el.removeClass('end-reached');
				this.countImages();
			}else{
				this.offlineError();
			}
		},
		addAll: function(){
			this.page++;
			if(!this.dom.pics.find('.pic').length){
				this.dom.pics.empty();
			}

			if(this.$el.hasClass('scrolling')){
				this.$el.removeClass('active scrolling');
				this.dom.indicator.removeClass('active');
			}

			if(this.page === this.totalPages){
				this.$el.addClass('end-reached');
				this.dom.pics.after('<div id="galleryEnd" class="infinite-scroll-end">No hay mas imagenes en la galería.</div>');
			}

			if(this.collection.length){
				this.collection.each(this.addOne.bind(this));

				//Call show on all images
				_.invoke(this.images, PicItem.prototype.show);
			}else{
				this.onContentError({message: 'No hay imagenes en la galería.'});
			}

			ActivityIndicator.hide();
		},
		addOne: function(model){
			//Create image view
			var view = new PicItem({
				model: model,
				appendTo: this.dom.pics
			});
			//Cache image reference
			var id = view.cid;
			var images = this.images;

			model.vid = id;

			images[id] = view;
		},
		prependOne: function(model){
			var view = new PicItem({
				model: model,
				appendTo: this.dom.pics,
				prepend: true
			}).show();
			var id = view.cid;
			var images = this.images;

			model.vid = id;

			images[id] = view;
		},
		onDestroyOne: function(id){
			var model = this.collection.get(id);
			var vid = model.vid;
			var images = this.images;

			var onDestroy = function(){
				if(vid && images[vid]){
					images[vid] = null;
					delete images[vid];
				}
				ActivityIndicator.hide();
				ActivityIndicator.show('Tu foto ha sido borrada.');
				_.delay(ActivityIndicator.hide, 2000);
			};
			var onDestroyError = function(){
				ActivityIndicator.hide();
				navigator.notification.alert('No hemos podido eliminar to foto, por favor intenta de nuevo.', _.noop, '¡Ups!');
			};

			if(model){
				ActivityIndicator.show('Eliminando foto...');
				model.destroy({wait: true, success: onDestroy, error: onDestroyError});
			}
		},
		removeAll: function(){
			_.invoke(this.images, PicItem.prototype.destroy);
			_.each(this.images, function(i){
				i = null;
			});
			this.images = {};
		},
		bounceInLeft: function(){
			Controller.prototype.bounceInLeft.call(this);

			this.dom.tabs.show();

			return this;
		},
		bounceOutLeft: function(){
			Controller.prototype.bounceOutLeft.call(this);
			
			this.dom.tabs.hide();
		},
		onImageSaved: function(file){
			file.set('owner', User.current());
			this.collection.prepend(file);
		},
		onPicture: function(model){
			Backbone.trigger('header:hide');
			this.bounceOutLeft();

			this.views.photo.update(model).show();

			this.listenToOnce(this.views.photo, 'hide', this.bounceInLeft.bind(this));
		},
		takePicture: function(){
			if(!this.online){
				this.onError(null, {message: 'Es necesaria una conexion a internet para poder guardar tus fotos.'});
				return;
			}

			navigator.camera.getPicture(this.onSuccess.bind(this), this.onPictureError.bind(this), config.CAMERA.DEFAULT);
		},
		grabPicture: function(){
			if(!this.online){
				this.onError(null, {message: 'Es necesaria una conexion a internet para poder guardar tus fotos.'});
				return;
			}

			navigator.camera.getPicture(this.onSuccess.bind(this), this.onPictureError.bind(this), config.CAMERA.GALLERY);
		},
		onSuccess: function(imageData) {
			this.views.uploadModal.update(imageData).show();

			this.listenToOnce(this.views.uploadModal, 'hide', this.onShow.bind(this));
		},
		onPictureError: function(message) {
			this.onError(null, {message: message});
		},
		onTouchEnd: function(){
			if(this.$el.hasClass('scrolling')){
				this.$el.addClass('active');
				this.getImages();
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

	var PicItem = Detachable.extend({
		template: require('templates/gallery_image_item'),
		className: 'padding pic',
		showFx: 'fadeIn',
		hideFx: 'fadeOut',
		events: {
			'tap': 'pic'
		},
		initialize: function(options){
			Detachable.prototype.initialize.apply(this, arguments);

			if(!options || !options.model){
				throw new Error('Gallery.PickItem requires a Backbone Model');
			}

			this.listenTo(this.model, 'destroy', this.destroy, this);

			return this.render();
		},
		render: function(){
			var model = this.model.toJSON();
			//If no thumbnail then go with the original image
			var url = model.thumbnail ? model.thumbnail.url : model.image.url;

			//Render & show
			this.$el.append(this.template({image: {url: url}}));
			this.$el.hide();

			this.$el.hammer();

			return this.$el;
		},
		pic: function(){
			Backbone.trigger('gallery:image:show', this.model);
		},
		onClose: function(){
			this.model = null;
		}
	});

	

	var UploadModal = HTMLModal.extend({
		template: require('templates/gallery_modal_upload'),
		title: 'Fotografia',
		events: {
			'tap #save': 'save',
			'tap button[data-dismiss]': 'hide'
		},
		onRender: function(){
			this.dom.image = this.$el.find('#image');
			this.dom.caption = this.$el.find('#caption');
		},
		save: function(){
			if(this.base64Data.length > 0){
				ActivityIndicator.show('Guardando');

				var img = new Parse.File('foto.jpg', { base64: this.base64Data });
				var file = new File({image: img, caption: this.dom.caption.val(), owner: User.current()});
				var ACL = new Parse.ACL();

				ACL.setPublicReadAccess(true);
				ACL.setPublicWriteAccess(false);
				ACL.setWriteAccess(User.current().id, true);

				file.setACL(ACL);

				var onSave = function(){
					var user = User.current();
					var images = user.relation('images');
					//Add image to relation;
					images.add(file);
					//Save image to user relation
					user
						.save()
						.then(function(){
							return file.fetch();
						})
						.then(function(f){
							this.onSave(f);
						}.bind(this),function(error){
							this.onError(null, error);
						}.bind(this));
				}.bind(this);

				var onError = function(){
					console.log('on error', arguments);
				}.bind(this);

				//Save file
				file.save().then(onSave).fail(onError);
			}
		},
		update: function(data){
			this.img = new Image();

			ActivityIndicator.show('Cargando imagen');

			this.img.onload = function(){
				ActivityIndicator.hide();

				var $img = $(this.img).addClass('full-image');
				//Append image 
				this.dom.image.append($img);
			}.bind(this);

			this.base64Data = data;

			data = 'data:image/jpeg;base64,' + data;

			this.img.src = data;

			return this;
		},
		onHide: function(){
			HTMLModal.prototype.onHide.call(this);

			this.dom.image.empty();
			this.dom.caption.val('');
			this.base64Data = null;
			this.img = null;
			this.file = null;
		},
		onShow: function(){
			HTMLModal.prototype.onShow.call(this);

			ActivityIndicator.hide();
		},
		onSave: function(file){
			try{
				ActivityIndicator.hide();
				ActivityIndicator.show('Imagen Guardada');

				_.delay(ActivityIndicator.hide, 2000);

				Backbone.trigger('gallery:image:prepend', file);
				this.hide();
			}catch(e){
				this.onError(null, e);
			}
		}
	});

	return Gallery;
});