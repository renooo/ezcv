'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('RegisterCtrl', function ($scope, $location, $http, appConfig, Country) {
	$scope.user = {};
	$scope.countries = [];
	$scope.isRegistering = false;

	Country.get().$promise.then(function(countries){
		$scope.countries = countries._embedded.countries;
	});

	$scope.viewEmployees = function(){
        $location.path('/employees');
    };

    $scope.register = function(){
    	$scope.isRegistering = true;

    	$http({
    		url: appConfig.registrationUrl,
    		method: 'POST',
    		data: $scope.user
    	}).success(function(data, status, headers, config){
    		$scope.isRegistering = false;


    	}).error(function(data, status, headers, config){
    		$scope.isRegistering = false;

    	});
    }
});
