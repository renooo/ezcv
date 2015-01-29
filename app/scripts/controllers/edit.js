'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $location) {
	$scope.viewEmployees = function(){
        $location.path('/employees');
    };
  });
