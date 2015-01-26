'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('SidenavCtrl', function($scope, $mdSidenav) {
	$scope.close = function() {
	    $mdSidenav('sidenav').close();
	};
});
