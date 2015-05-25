/* globals define, Camera */
define('config', function(){
	'use strict';

	return {
		PARSE: {
			//Prod
			ID: 'Li087ST1O7bYBGKxhFQhWwlKnPRy4jJ2575mz7C3',
			JSKEY: 'ex5SBIHB9bNN9ELyx1ZRFoqiWVfrl5SIukRct2zt',
			CLIENTKEY: 'Jy03KXgoxpTQcfkpxhburHLc5LSzMaGzlQIoKJk5'
			//Dev
			//ID: 'WhG4gZOUXz16xV4uLfDV4qLAjh3fDTl0DDxAwY0p',
			//JSKEY: '9q4nTLaRuPvEmdz4ztsXDabmjxmR0TuOxKkh3TeA'
		},
		PUSHER: {
			KEY: 'f0f806e6c0165a801fb1'
		},
		FB: {
			DEFAULT_PERMISSION: ['email', 'public_profile'],
			APP_NAME: 'Zoe Water Movil',
			URL: 'https://www.facebook.com/zoewater'
		},
		CAMERA: {
			DEFAULT: {
				quality : 75,
				destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 500,
				targetHeight: 500,
				saveToPhotoAlbum: true
			},
			GALLERY: {
				quality : 75,
				destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 500,
				targetHeight: 500,
				saveToPhotoAlbum: false
			}
		},
		GEO: {
			DEFAULT: { enableHighAccuracy: true },
			DEFAULT_CENTER: {coords: {latitude: 19.432608, longitude: -99.133208}},
			DEFAULT_ZOOM: 6
		},
		DATE: {
			DAY: [
				'Domingo',
				'Lunes',
				'Martes',
				'Miércoles',
				'Jueves',
				'Viernes',
				'Sabado'
			]
		},
		GALLERY: {
			LIMIT: 24
		},
		BLOG: {
			LIMIT: 15
		},
		SHARE: {
			DEFAULT: {
				'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT, // default is THEME_TRADITIONAL
				'title': 'Compartir',
				'buttonLabels': ['Via Facebook', 'Via Twitter'],
				'androidEnableCancelButton' : true, // default false
				'winphoneEnableCancelButton' : true, // default false
				'addCancelButtonWithLabel': 'Cancel'
			}
		},
		TWITTER: '@zoe_water'
	};
});