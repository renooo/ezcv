'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('AuthInterceptor', function ($cookieStore, $q, $location) {
	return {
		request: function(config){
			if($cookieStore.get('access_token')){
				config.headers['Authorization'] = 'Bearer '+$cookieStore.get('access_token');
			}
			return config || $q.when(config);
		},
		responseError: function(rejection) {
			if(rejection.status == 401 || rejection.status == 403){
				$cookieStore.remove('access_token');
    			$cookieStore.remove('my_id');
				$location.path('/login');
			}
	        return $q.reject(rejection);
		}
	};
  });
