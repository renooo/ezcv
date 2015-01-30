'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('SidenavCtrl', function($scope, $mdSidenav, $location, $cookieStore) {
  	$scope.myId = $cookieStore.get('my_id');

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
		$location.path('/edit');
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
