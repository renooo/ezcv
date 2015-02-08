'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $rootScope, $window, $location, $filter, $q, $resource, $mdBottomSheet, $mdDialog, me, toastMessage, Employee, Experience, Mission) {
  	$scope.me = angular.copy(me);
    $scope.loading = false;
    
    $scope.viewEmployees = function(){
        if(angular.equals($scope.me, me)) {
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
          var promises = [];
          delete $rootScope.me;
          $scope.me = null;

          angular.forEach($rootScope.newExperiences, function(newExperience){
            promises.push(Experience.remove({experienceId: newExperience.id}).$promise);
          });

          angular.forEach($rootScope.newMissions, function(newMission){
            promises.push(Mission.remove({missionId: newMission.id}).$promise);
          });

          $q.all(promises).then(function(){
            delete $rootScope.newExperiences;
            delete $rootScope.deletedExperiences;
            delete $rootScope.newMissions;
            delete $rootScope.deletedMissions;
            $location.path('/employees');
          });
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
      if(!$scope.me){
        return;
      }
      $scope.loading = true;
      Experience.save({_embedded: {employee: $scope.me}}, function(experience){
        if(!angular.isArray($scope.me._embedded.experiences)){
          $scope.me._embedded.experiences = [];
        }
        $scope.me._embedded.experiences.push(experience);
        $rootScope.newExperiences.push(experience);
        $location.path('/edit/experience/'+experience.id);
        $scope.loading = false;
      });
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
            $scope.deletedExperiences.push(experience);
        });
    };

    $scope.update = function(){
        var promises = [];
        
        if(angular.equals($scope.me, me)){
          return;
        }

        $scope.loading = true;
                  
        angular.forEach($rootScope.deletedExperiences, function(deletedExperience){
            promises.push(Experience.remove({experienceId: deletedExperience.id}).$promise);
        });

        angular.forEach($rootScope.deletedMissions, function(deletedMission){
            promises.push(Mission.remove({missionId: deletedMission.id}).$promise);
        });

        angular.forEach($scope.me._embedded.experiences, function(experience){
            var experienceOriginal = me._embedded.experiences.filter(function(exp){ return exp.id == experience.id; })[0];

            if(angular.isDefined(experienceOriginal) && angular.equals(experience, experienceOriginal)){
              return;
            }

            experience._embedded.employee = $scope.me;
            promises.push(Experience.update(experience).$promise);

            angular.forEach(experience._embedded.missions, function(mission){
                if(angular.isDefined(experienceOriginal)){
                  var missionOriginal = experienceOriginal._embedded.missions.filter(function(mis){ return mis.id == mission.id; })[0];

                  if(angular.isDefined(missionOriginal) && angular.equals(mission, missionOriginal)){
                    return;
                  }
                }
                mission._embedded.experience = experience;
                promises.push(Mission.update(mission).$promise);
            });

        });

        $q.all(promises).then(function(){
            Employee.get({employeeId: me.id}, function(updated){
              angular.copy(updated, me);
              angular.copy(updated, $scope.me);
              toastMessage.show('Votre CV a bien été mis à jour.');            
              $scope.loading = false;
            });
        }, function(){
            toastMessage.show('Erreur durant la mise à jour.');
            $scope.loading = false;
        });
    };

    if(!angular.isDefined($rootScope.me)){
      $rootScope.me = $scope.me;
      $rootScope.newExperiences = [];
      $rootScope.deletedExperiences = [];
      $rootScope.newMissions = [];
      $rootScope.deletedMissions = [];
 
    }else{
      $scope.me = $rootScope.me;
    }
  });
