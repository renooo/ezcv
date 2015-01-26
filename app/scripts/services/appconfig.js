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
		apiEndpoint: 'http://ezcv-api.local:8888/api'
	},
	prod = {
		apiEndpoint: 'http://ezcv-api.bougre.fr/api'
	};

	if($location.$$host.match(/\.local$/))
		return dev;

	return prod;
  });
