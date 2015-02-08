'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('ProfileCtrl', function ($scope, $window, $location, $mdDialog, $animate, $filter, $resource, toastMessage, me, countries) {
  	$scope.me = angular.copy(me);
  	$scope.countries = countries;
    $scope.errors = {};
  	$scope.loading = false;

    if(angular.equals($scope.me, {})){
      $location.path('/login');
      return;
    }

    $scope.viewEmployees = function(){
        if(angular.equals($scope.me, me)) {
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

    $scope.update = function(){
        var employee = angular.copy($scope.me);

        angular.forEach(employee, function(value, fieldName){
          if(angular.isDefined($scope.profileForm[fieldName])){
            $scope.profileForm[fieldName].$invalid = false;
            $scope.profileForm[fieldName].$valid = true;
          }
        });

        $scope.errors = {};
        $scope.loading = true;

        employee.$update(function(updated){
          $scope.loading = false;
          angular.copy(updated, me);
          angular.copy(updated, $scope.me);
          toastMessage.show('Vos données ont bien été mises à jour.');

        }, function(result){
          angular.forEach(result.data.validation_messages, function(value, fieldName){
              if(angular.isDefined($scope.profileForm[fieldName])){
                $scope.profileForm[fieldName].$invalid = true;
                $scope.profileForm[fieldName].$valid = false;
              }
          });

          $window.scrollTo(0, 0);
          $scope.loading = false;
          toastMessage.show('La mise à jour a échoué.');
          $scope.errors = result.data.validation_messages;
        });
      };
  });
