'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:SubscribeCtrl
 * @description
 * # SubscribeCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('SubscribeCtrl', function ($scope, $location) {
	$scope.viewEmployees = function(){
        $location.path('/employees');
    };
  });
