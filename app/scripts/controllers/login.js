'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('LoginCtrl', function ($scope, $location, $http, appConfig, Employee, me) {
  	$scope.authenticating = false;
  	$scope.error = null;
  	$scope.login = {
  		username: '', 
  		password: '',
  		client_id: 'ezcv',
  		grant_type: 'password'
  	};

  if(angular.isDefined(localStorage.myId)){
    $location.path('/employees');
    return;
  }

	$scope.viewEmployees = function(){
		$location.path('/employees');
	};

	$scope.redirectAfterLogin = function(){
    $location.path('/employees');
	};

	$scope.authenticate = function(){
  		$scope.authenticating = true;
  		$scope.error = null;
  		
  		$http({
  			url: appConfig.oauthEndpoint,
  			method: 'POST',
  			data: $scope.login
  		}).
  		success(function(data, status, headers, config) {
  			var filter = {
  				'filter[0][type]': 'eq', 
  				'filter[0][field]': 'userName', 
  				'filter[0][value]': $scope.login.username
  			};

  			localStorage.accessToken = data.access_token;

  			Employee.query(filter, function(employees){
  				localStorage.myId = employees._embedded.employees[0].id;
          angular.copy(employees._embedded.employees[0], me);
          $scope.authenticating = false;
          $scope.redirectAfterLogin();
  			});
  		}).
  		error(function(data, status, headers, config) {
  			$scope.error = data;
  			$scope.authenticating = false;
  		});
	};
});
