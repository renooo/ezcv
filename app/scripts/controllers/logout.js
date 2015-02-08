'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('LogoutCtrl', function ($window, $location, me) {
  	if(!angular.isDefined(localStorage.myId)){
  		$location.path('/');
  		return;
  	}
    delete localStorage.accessToken;
    delete localStorage.myId;
    angular.forEach(me, function(value, key){
    	delete me[key];
    });
    $location.path('/');
  });
