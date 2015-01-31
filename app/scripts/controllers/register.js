'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('RegisterCtrl', function ($scope, $location, $http, $filter, appConfig, Country) {
	$scope.user = {};
	$scope.countries = [];
	$scope.registering = false;
    $scope.errors = {};

	Country.get().$promise.then(function(countries){
		$scope.countries = countries._embedded.countries;
	});

	$scope.viewEmployees = function(){
        $location.path('/employees');
    };

    $scope.redirectAfterRegister = function(){
        $location.path('/login');
    };

    $scope.register = function(){
        var userData = angular.copy($scope.user);

        if(angular.isDefined(userData.birthdate)){
            userData.birthdate = $filter('date')(userData.birthdate, 'y-MM-dd');
        }

    	$scope.registering = true;

    	$http({
    		url: appConfig.registrationUrl,
    		method: 'POST',
    		data: userData
    	}).success(function(data, status, headers, config){
    		$scope.redirectAfterRegister();

    	}).error(function(data, status, headers, config){
    		$scope.registering = false;
            $scope.errors = {};

            for(var fieldName in data.validation_messages){
                $scope.errors[fieldName] = [];
                $scope.registerForm[fieldName].$error = {};

                for(var errorCode in data.validation_messages[fieldName]){
                    $scope.registerForm[fieldName].$error[errorCode] = true;
                    $scope.errors[fieldName].push({
                        code: errorCode, 
                        message: data.validation_messages[fieldName][errorCode]
                    });
                }
            }
    	});
    };
});
