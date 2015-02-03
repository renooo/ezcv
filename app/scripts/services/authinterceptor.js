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
			if(localStorage.access_token){
				config.headers['Authorization'] = 'Bearer '+localStorage.access_token;
			}
			return config || $q.when(config);
		},
		responseError: function(rejection) {
			if(rejection.status == 401 || rejection.status == 403){
			    delete localStorage.access_token;
			    delete localStorage.my_id;
				$location.path('/login');
			}
	        return $q.reject(rejection);
		}
	};
  });
