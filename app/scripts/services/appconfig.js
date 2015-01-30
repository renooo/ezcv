'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.appConfig
 * @description
 * # apiConfig
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('appConfig', function($location){
  	var dev = {
		apiEndpoint: 'http://ezcv-api.local:8888/api',
		oauthEndpoint: 'http://ezcv-api.local:8888/oauth',
		registrationUrl: 'http://ezcv-api.local:8888/register'
	},
	prod = {
		apiEndpoint: 'http://ezcv-api.bougré.fr/api',
		oauthEndpoint: 'http://ezcv-api.bougré.fr/oauth',
		registrationUrl: 'http://ezcv-api.bougré.fr/register'
	};

	if($location.$$host.match(/\.local$/)){
		return dev;
	}

	return prod;
  });
