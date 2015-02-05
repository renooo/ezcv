'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('ProfileCtrl', function ($scope, $window, $location, $mdDialog, $mdToast, $animate, $filter, $resource, Employee, Country) {
  	$scope.me = null;
    $scope.meOriginal = null;
  	$scope.myId = localStorage.my_id;
  	$scope.countries = [];
    $scope.errors = {};
  	$scope.loading = true;
  	$scope.updating = false;

    if(!$scope.myId){
      $location.path('/login');
      return;
    }

    Employee.get({employeeId: $scope.myId}, function(me){
      Country.get({}, function(countries){
          $resource(me._embedded.country._links.self.href).get({}, function(country){
            $scope.countries = countries._embedded.countries;
            
            $scope.me = me;
            $scope.me.birthdate = new Date(me.birthdate.date);
            $scope.me.zipCode = parseInt(me.zipCode);
            $scope.me.country = country;

            $scope.meOriginal = angular.copy($scope.me);

            $scope.loading = false;
          });
      });
    });

    $scope.viewEmployees = function(){
        if(angular.equals($scope.me, $scope.meOriginal)) {
          $location.path('/employees');
          return;
        };

        var confirm = $mdDialog.confirm()
          .title('Quitter sans sauvegarder')
          .content('Êtes-vous certain(e) de vouloir quitter sans sauvegarder ?\nToutes les modifications seront perdues.')
          .ariaLabel('Confirmation')
          .ok('Quitter')
          .cancel('Continuer l\'édition');

        $mdDialog.show(confirm).then(function() {
          $location.path('/employees');
        });
    };

    $scope.redirectAfterUpdate = function(){
        $location.path('/employees');
    };

    $scope.showToastMessage = function(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(6000)
        );
    };

    $scope.update = function(){
        var userData = angular.copy($scope.me);

        if(angular.isDefined(userData.birthdate)){
            userData.birthdate = $filter('date')(userData.birthdate, 'y-MM-dd');
        }

        angular.forEach(userData, function(value, fieldName){
          if(angular.isDefined($scope.profileForm[fieldName])){
            $scope.profileForm[fieldName].$invalid = false;
            $scope.profileForm[fieldName].$valid = true;
          }
        });

        $scope.errors = {};
        $scope.updating = true;

        Employee.update({employeeId: userData.id}, userData, function(){
          $scope.updating = false;
          $scope.showToastMessage('Vos données ont bien été mises à jour.');
          $scope.redirectAfterUpdate();

        }, function(result){
          angular.forEach(result.data.validation_messages, function(value, fieldName){
              if(angular.isDefined($scope.profileForm[fieldName])){
                $scope.profileForm[fieldName].$invalid = true;
                $scope.profileForm[fieldName].$valid = false;
              }
          });

          $window.scrollTo(0, 0);
          $scope.updating = false;
          $scope.showToastMessage('La mise à jour a échoué.');
          $scope.errors = result.data.validation_messages;
        });
      };
  });
