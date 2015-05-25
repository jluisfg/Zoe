/* globals define, _, google, Parse, ActivityIndicator */
define(function(require){
	'use strict';

	//MVC
	var Controller = require('Root');
	var Detachable = require('Detachable');
	var config = require('config');
	var Place = Parse.Object.extend('POS2');
	var Places = Parse.Collection.extend({
		model: Place,
		query: (new Parse.Query(Place))
	});

	require('gmaps');

	var POS = Controller.extend({
		id: 'pos-page',
		template: require('templates/pos'),
		title: 'Puntos de Venta',
		markers: [],
		loading: false,
		infowindow: null,
		hideFx: 'fadeOut',
		showFx: 'fadeIn',
		initialize: function(){
			Controller.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

			this.collection = new Places();
			this.views.place = new PlaceView().hide();

			this.listenTo(this.collection, 'reset', this.addAll, this);
			this.listenTo(this.collection, 'error', this.onError, this);

			return this.render();
		},
		addAll: function(){
			if(!this.collection.models.length){
				ActivityIndicator.hide();
				navigator.notification.alert('Al parecer no hay ningun punto de venta cercano a ti, intenta con otra ubicación.', _.noop, '¡Ups!');
				return;
			}

			this.removeAll();

			this.collection.each(this.addMarker.bind(this));

			ActivityIndicator.hide();
		},
		addMarker: function(model){
			try{
				var data = model.toJSON();
				var location = data.location;
				var map = this._getMap();
				var image = {
					url: 'images/map_pin.png',
					scaledSize: new google.maps.Size(15, 40),
					size: new google.maps.Size(15, 40),
					origin: new google.maps.Point(0,0)
				};
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(location.latitude, location.longitude),
					map: map,
					title: model.get('nombre'),
					animation: google.maps.Animation.DROP,
					icon: image
				});

				google.maps.event.addListener(marker, 'click', function() {
					this.views.place.model.set(data);
				}.bind(this));
				this.markers.push(marker);	
			}catch(e){
				console.log(e, e.message, e.stock);
			}
		},
		removeAll: function(){
			_.each(this.markers, this.removeMarker, this);
			this.markers = [];
		},
		removeMarker: function(marker){
			marker.setMap(null);
			marker = null;
			google.maps.event.removeListener(marker, 'click');
		},
		getPlaces: function(position){
			var location = new Parse.GeoPoint(position);
			var query = this.collection.query;

			ActivityIndicator.hide();
			ActivityIndicator.show('Buscando puntos de venta');
			
			query
				.near('location', location)
				.withinKilometers('location', location, 10);

			this.collection.fetch();
		},
		onRender: function(){
			//Call base method
			Controller.prototype.onRender.call(this);
			//Create map
			this.dom.map = this.$el.find('#map');
			//Try creating the map
			this._getMap();
		},
		onShow: function(){
			Controller.prototype.onShow.call(this);

			if(this.online){
				ActivityIndicator.show('Cargando');
				navigator.geolocation.getCurrentPosition(
					this.onGeolocation.bind(this),
					this.onGeolocationError.bind(this),
					config.GEO.DEFAULT
				);
			}else{
				this.onContentError({message: 'No es posible cargar el mapa.'});
			}
		},
		onHide: function(){
			this.views.place.hide();
		},
		onCenterChange: function(){
			if(this._getMap().getZoom() >= 11){
				var position = this._getMap().getCenter();
				var currentCenter = this.currentCenter;

				if(position && currentCenter){
					var distanceFromLastPosition = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(position, currentCenter)/1000);

					if(distanceFromLastPosition >= 10){
						this.currentCenter = position;
						this.getPlaces({latitude: position.lat(), longitude: position.lng()});
					}
				}
			}
		},
		onRightButton: function(){
			if(this.online){
				this.freestyle = false;
				this.currentCenter = null;
				navigator.geolocation.getCurrentPosition(
					this.onGeolocation.bind(this),
					this.onGeolocationError.bind(this),
					config.GEO.DEFAULT
				);
			}else{
				this.offlineError();
			}
			
		},
		onGeolocation: function(position){
			try{
				this.position = position.coords;
				this.location = new google.maps.LatLng(this.position.latitude, this.position.longitude);

				if(!this.map){
					this._getMap();	
				}

				this.map.setOptions({
					center: this.location,
					zoom: 12
				});

				this.marker.setOptions({
					position: this.location
				});

				//Set center and zoom, we will use them to compare agains center changes
				this.currentCenter = this.map.getCenter();
				this.currentZoom = this.map.getZoom();

				this.getPlaces(this.position);
			}catch(e){
				console.log(e, e.stack, e.message);
			}
		},
		onGeolocationError: function(error){
			switch(error.code){
			case 2:
				error.message = 'Ubicacion no disponible.';
				break;
			case 3:
				error.message = 'Ubicacion temporalmente no disponible';
				break;
			}

			this.onError(null, error);
			//Render map in default position (Mexico)
			this.onGeolocation({coords: {latitude: config.GEO.DEFAULT_CENTER.lat, longitude: config.GEO.DEFAULT_CENTER.lng}});
		},
		onOnline: function(){
			Controller.prototype.onOnline.call(this);

			this._getMap();
		},
		_getMap: function(){

			if(!this.online){
				return;
			}

			if(this.map instanceof google.maps.Map){
				return this.map;
			}

			if(!this.position){
				this.position = config.GEO.DEFAULT_CENTER.coords;
			}

			if(!this.location){
				this.location = new google.maps.LatLng(this.position.latitude, this.position.longitude);
			}

			this.image = {
				url: 'images/user_marker@2x.png',
				scaledSize: new google.maps.Size(30, 30),
				anchor: new google.maps.Point(10, 10)
			};
			this.map = new google.maps.Map(this.dom.map[0], {
				center: this.location,
				zoom: 12,
				zoomControl: false,
				streetViewControl: false
			});
			this.marker = new google.maps.Marker({
				position: this.location,
				map: this.map,
				title: '',
				animation: google.maps.Animation.DROP,
				icon: this.image
			});

			google.maps.event.addListener(this.map, 'center_changed', this.onCenterChange.bind(this));
			google.maps.event.addListener(this.map, 'zoom_changed', this.onCenterChange.bind(this));

			return this.map;
		}
	});

	var PlaceView = Detachable.extend({
		className: 'infobox padding animated',
		id: 'pos-infobox',
		template: require('templates/pos_info_window'),
		events: {
			'swipe': 'hide',
			'tap .close': 'hide'
		},
		initialize: function(){
			this.model = new Place();
			this.listenTo(this.model, 'change', this.update, this);

			return this.render();
		},
		render: function(){
			this.update();

			this.$el.hammer();

			return this;
		},
		update: function(){
			this.$el.html(this.template({data:this.model.toJSON()}));
			this.show();

			return this;
		},
		show: function(){
			if(!this.isAttached()){
				this.$el.hide();
				this._append();
			}

			this.$el.removeClass('fadeOutDown').addClass('fadeInUp').show();

			return this;
		},
		hide: function(){
			this.$el.removeClass('fadeInUp').addClass('fadeOutDown');

			return this;
		}
	});

	return POS;
});