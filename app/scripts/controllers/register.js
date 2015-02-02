'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('RegisterCtrl', function ($scope, $window, $location, $cookieStore, $mdToast, $animate, $http, $filter, appConfig, Country) {
	$scope.user = {country: {id: 'FR'}};
	$scope.countries = [];
	$scope.registering = false;
    $scope.errors = {};

    if($cookieStore.get('my_id')){
        $location.path('/employees');
        return;
    }

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

        for(var fieldName in userData){
            $scope.registerForm[fieldName].$invalid = false;
        }

        $scope.errors = {};
    	$scope.registering = true;

    	$http({
    		url: appConfig.registrationUrl,
    		method: 'POST',
    		data: userData
    	}).success(function(data, status, headers, config){
            $mdToast.show(
                $mdToast.simple()
                .content('L\'inscription a réussi. Veuillez vous connecter pour continuer.')
                .position('bottom right')
                .hideDelay(6000)
            );
    		$scope.redirectAfterRegister();

    	}).error(function(data, status, headers, config){
            for(var fieldName in data.validation_messages){
                for(var errorCode in data.validation_messages[fieldName]){
                   $scope.registerForm[fieldName].$invalid = true;
                }
            }

            $window.scrollTo(0, 0);

            $mdToast.show(
                $mdToast.simple()
                  .content('L\'inscription a échoué.')
                  .position('bottom right')
                  .hideDelay(6000)
            );

            $scope.registering = false;
            $scope.errors = data.validation_messages;
    	});
    };
});
