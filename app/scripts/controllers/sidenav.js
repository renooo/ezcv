'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('SidenavCtrl', function($scope, $rootScope, $mdSidenav, $location) {
  	$scope.myId = localStorage.my_id;

	$scope.close = function() {
	    return $mdSidenav('sidenav').close();
	};
	$scope.viewEmployees = function(){
		$location.path('/employees');
	};
	$scope.viewMyCV = function(){
		$location.path('/employee/'+$scope.myId);
	};
	$scope.editMyCV = function(){
		delete $rootScope.me;
		$location.path('/edit');
	};
	$scope.editMyProfile = function(){
		$location.path('/profile');
	};
	$scope.register = function(){
		$location.path('/register');
	};
	$scope.login = function(){
		$location.path('/login');
	};
	$scope.logout = function(){
		$location.path('/logout');
	};
});
