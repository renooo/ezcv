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
		if(!me){
			return;
		}
		//me.then(function(me){
			$location.path('/employee/'+me.id);
		//});		
	};
	$scope.editMyCV = function(){
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
