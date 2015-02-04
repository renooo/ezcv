'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $location, $q, $resource, $mdBottomSheet, Employee) {
  	$scope.me = null;
    $scope.meOriginal = null;
  	$scope.myId = localStorage.my_id;
    
    $scope.viewEmployees = function(){
        if(angular.equals($scope.me, $scope.meOriginal) || confirm('Êtes-vous certain(e) de vouloir quitter sans sauvegarder ?')){
          $location.path('/employees');
        }
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
        console.debug(['edit', experience]);
    };

    $scope.deleteExperience = function(experience){
      if(!confirm('Êtes-vous certain(e) de vouloir supprimer cette expérience de votre CV ?')){
          return;
      }
      $scope.me._embedded.experiences = $scope.me._embedded.experiences.filter(function(exp){
          return !angular.equals(exp, experience);
      });
    };

    $scope.update = function(){
        console.debug('update');
    };

    Employee.get({employeeId: $scope.myId}).$promise.then(function(me){
        angular.forEach(me._embedded.experiences, function(experience){
            experience._embedded.job = $resource(experience._embedded.job._links.self.href).get();
            experience._embedded.company = $resource(experience._embedded.company._links.self.href).get();
        });

        $q.all(me._embedded.experiences.map(function(experience){
            return $q.all([experience._embedded.job.$promise, experience._embedded.company.$promise]);
        })).then(function(promises){
            $scope.me = me;
            $scope.meOriginal = angular.copy($scope.me);
        });    
    });
  });
