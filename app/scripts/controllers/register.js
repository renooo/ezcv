'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('RegisterCtrl', function ($scope, $window, $location, $mdToast, $animate, $http, $filter, appConfig, Country) {
	$scope.user = {country: {id: 'FR'}};
	$scope.countries = [];
	$scope.registering = false;
    $scope.errors = {};

    if(localStorage.my_id){
        $location.path('/employees');
        return;
    }

	Country.get({}, function(countries){
		$scope.countries = countries._embedded.countries;
	});

	$scope.viewEmployees = function(){
        $location.path('/employees');
    };

    $scope.redirectAfterRegister = function(){
        $location.path('/login');
    };    
    
    $scope.showToastMessage = function(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(6000)
        );
    };

    $scope.register = function(){
        var userData = angular.copy($scope.user);

        if(angular.isDefined(userData.birthdate)){
            userData.birthdate = $filter('date')(userData.birthdate, 'y-MM-dd');
        }
        
        for(var fieldName in userData){
          if(angular.isDefined($scope.registerForm[fieldName])){
            $scope.registerForm[fieldName].$invalid = false;
            $scope.registerForm[fieldName].$valid = true;
          }
        }

        $scope.errors = {};
    	$scope.registering = true;

    	$http({
    		url: appConfig.registrationUrl,
    		method: 'POST',
    		data: userData
    	}).success(function(data, status, headers, config){
            $scope.showToastMessage('L\'inscription a réussi. Veuillez vous connecter pour continuer.');
    		$scope.redirectAfterRegister();

    	}).error(function(data, status, headers, config){
            angular.forEach(data.validation_messages, function(value, fieldName){
                if(angular.isDefined($scope.registerForm[fieldName])){
                    $scope.registerForm[fieldName].$invalid = true;
                    $scope.registerForm[fieldName].$valid = false;
                }
            });

            $window.scrollTo(0, 0);
            $scope.registering = false;
            $scope.showToastMessage('L\'inscription a échoué.');        
            $scope.errors = data.validation_messages;
    	});
    };
});
