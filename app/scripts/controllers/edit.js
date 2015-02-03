'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $location, $cookieStore, Employee) {
  	$scope.me = null;
  	$scope.myId = $cookieStore.get('my_id');

	$scope.viewEmployees = function(){
		//confirm
        $location.path('/employees');
    };

    Employee.get({employeeId: $scope.myId}).$promise.then(function(me){
    	$scope.me = me;
    	$scope.me.experiences = $scope.me._embedded.experiences;
    	delete $scope.me._embedded.experiences;
    });
  });
