'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('SidenavCtrl', function($scope, $mdSidenav, $location) {
	$scope.close = function() {
	    return $mdSidenav('sidenav').close();
	};
	$scope.viewEmployees = function(){
		$location.path('/employees');
	};
	$scope.viewMyCV = function(){
		$location.path('/employee/'+1);
	};
	$scope.editMyCV = function(){
		$location.path('/edit');
	};
	$scope.login = function(){
		$location.path('/login');
	};
	$scope.logout = function(){
		$location.path('/logout');
	};
});
