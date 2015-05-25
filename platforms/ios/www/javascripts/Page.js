/* global define */
define(function(require){
	'use strict';

	return {
		About      : require('About'),
		Auth       : require('Auth'),
		Forgot     : require('AuthForgot'),
		Login      : require('AuthLogin'),
		Password   : require('AuthPassword'),
		Signup     : require('AuthSignup'),
		Weight     : require('AuthWeight'),
		Birthdate  : require('AuthBirthdate'),
		Blog       : require('Blog'),
		Entry      : require('BlogEntry'),
		Gallery    : require('Gallery'),
		Home       : require('Home'),
		Photo      : require('GalleryPhoto'),
		//Pos        : require('Pos'),
		Premier    : require('Premier'),
		PremierInformation : require('PremierInformation'),
		Settings   : require('Settings'),
		SettingsEmail : require('SettingsEmail'),
		SettingsName  : require('SettingsName'),
		SettingsPassword : require('SettingsPassword'),
		SettingsWeight : require('SettingsConsumption'),
		Stats      : require('Stats'),
		Store      : require('Store'),
		TOS        : require('TOS')
	};
});