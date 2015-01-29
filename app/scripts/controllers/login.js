'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('LoginCtrl', function ($scope, $location, $http, $cookieStore, appConfig, Employee) {
  	$scope.authenticating = false;
  	$scope.error = null;
  	$scope.login = {
  		username: '', 
  		password: '',
  		client_id: 'ezcv',
  		grant_type: 'password'
  	};

	$scope.viewEmployees = function(){
		$location.path('/employees');
	};

	$scope.redirectAfterLogin = function(){
		$scope.viewEmployees();
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

  			$cookieStore.put('access_token', data.access_token);

  			Employee.get(filter).$promise.then(function(employees){
  				$cookieStore.put('my_id', employees._embedded.employees[0].id);
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
