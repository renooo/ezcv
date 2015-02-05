'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $rootScope, $location, $q, $resource, $mdBottomSheet, $mdDialog, Employee) {
  	$scope.me = null;
    $scope.meOriginal = null;
  	$scope.myId = localStorage.my_id;
    
    $scope.viewEmployees = function(){
        if(angular.equals($scope.me, $scope.meOriginal)) {
          $location.path('/employees');
          return;
        }

        var confirm = $mdDialog.confirm()
          .title('Quitter sans sauvegarder')
          .content('Êtes-vous certain(e) de vouloir quitter sans sauvegarder ?\nToutes les modifications seront perdues.')
          .ariaLabel('Confirmation')
          .ok('Quitter')
          .cancel('Continuer l\'édition');

        $mdDialog.show(confirm).then(function() {
          delete $rootScope.me;
          $location.path('/employees');
        });
    };

    $scope.showExperienceBottomSheet = function(experience){
      $mdBottomSheet.show({
        templateUrl: 'views/experiencelistbottomsheet.html',
        controller: 'ExperiencelistbottomsheetCtrl'
      }).then(function(action){
        var functionName = action+'Experience';
        if(angular.isFunction($scope[functionName])){
          $scope[functionName](experience);
        }
       });
    };

    $scope.newExperience = function(){
        console.debug('new');
    };

    $scope.editExperience = function(experience){
        $location.path('/edit/experience/'+experience.id);
    };

    $scope.deleteExperience = function(experience){
      var confirm = $mdDialog.confirm()
        .title('Supprimer une expérience')
        .content('Êtes-vous certain(e) de vouloir supprimer cette expérience de votre CV ?')
        .ariaLabel('Confirmation')
        .ok('Supprimer')
        .cancel('Conserver');

        $mdDialog.show(confirm).then(function() {
            $scope.me._embedded.experiences = $scope.me._embedded.experiences.filter(function(exp){
                return !angular.equals(exp, experience);
            });
        });
    };

    $scope.update = function(){
        console.debug('update');
    };

    if(angular.isDefined($rootScope.me)){
      $scope.me = $rootScope.me;

    }else{
      Employee.get({employeeId: $scope.myId}).$promise.then(function(me){
          angular.forEach(me._embedded.experiences, function(experience){
              experience._embedded.job = $resource(experience._embedded.job._links.self.href).get();
              experience._embedded.company = $resource(experience._embedded.company._links.self.href).get();
              experience.dateStart = new Date(experience.dateStart.date);
              experience.dateEnd = new Date(experience.dateEnd.date);
          });

          $q.all(me._embedded.experiences.map(function(experience){
              return $q.all([experience._embedded.job.$promise, experience._embedded.company.$promise]);
          })).then(function(promises){
              $scope.me = me;
              $scope.meOriginal = angular.copy($scope.me);
              $rootScope.me = $scope.me;
          });    
      });
    }
  });
