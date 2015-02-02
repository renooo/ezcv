'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('ProfileCtrl', function ($scope, $window, $location, $mdToast, $animate, $cookieStore, $filter, $resource, Employee, Country) {
  	$scope.me = null;
  	$scope.myId = $cookieStore.get('my_id');
  	$scope.countries = [];
    $scope.errors = {};
  	$scope.loading = true;
  	$scope.updating = false;

    $scope.viewEmployees = function(){
        $location.path('/employees');
    };

    $scope.redirectAfterUpdate = function(){
        $scope.viewEmployees();
    };

    if(!$scope.myId){
      $location.path('/login');
      return;
    }

  	Employee.get({employeeId: $scope.myId}).$promise.then(function(me){
  		Country.get().$promise.then(function(countries){
          $resource(me._embedded.country._links.self.href).get().$promise.then(function(country){
            $scope.countries = countries._embedded.countries;
            
            $scope.me = me;
            $scope.me.birthdate = new Date(me.birthdate.date);
            $scope.me.zipCode = parseInt(me.zipCode);
            $scope.me.country = country;

            $scope.loading = false;
          });
  		});
  	});

    $scope.update = function(){
        var userData = angular.copy($scope.me);

        if(angular.isDefined(userData.birthdate)){
            userData.birthdate = $filter('date')(userData.birthdate, 'y-MM-dd');
        }

        for(var fieldName in userData){
          if(angular.isDefined($scope.profileForm[fieldName])){
            $scope.profileForm[fieldName].$invalid = false;
          }
        }

        $scope.errors = {};
        $scope.updating = true;

        Employee.update({employeeId: userData.id}, userData).$promise.then(function(){
          $mdToast.show(
            $mdToast.simple()
              .content('Vos données ont bien été mises à jour.')
              .position('bottom right')
              .hideDelay(6000)
          );
          $scope.redirectAfterUpdate();

        }).catch(function(result){

          for(var fieldName in result.data.validation_messages){
              for(var errorCode in result.data.validation_messages[fieldName]){
                 $scope.profileForm[fieldName].$invalid = true;
              }
          }

          $window.scrollTo(0, 0);

          $mdToast.show(
            $mdToast.simple()
              .content('La mise à jour a échoué.')
              .position('bottom right')
              .hideDelay(6000)
          );

          $scope.updating = false;
          $scope.errors = result.data.validation_messages;
          console.debug('erreurs');
          console.debug(result.data.validation_messages);
        });
      };
  });
