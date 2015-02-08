'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('AuthInterceptor', function ($q, $location) {
	return {
		request: function(config){
			if(localStorage.accessToken){
				config.headers['Authorization'] = 'Bearer '+localStorage.accessToken;
			}
			return config || $q.when(config);
		},
		responseError: function(rejection) {
			if(rejection.status == 401 || rejection.status == 403){
			    delete localStorage.accessToken;
			    delete localStorage.myId;
				$location.path('/login');
			}
	        return $q.reject(rejection);
		}
	};
  });
