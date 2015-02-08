'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Me
 * @description
 * # Me
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .provider('me', {
  	$get: function(Employee){
	    if(angular.isDefined(localStorage.myId)){
	        return Employee.get({employeeId: localStorage.myId}).$promise;
	    }
	    return {};
  	}
  });
