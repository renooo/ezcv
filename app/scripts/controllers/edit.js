'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditCtrl', function ($scope, $rootScope, $location, $filter, $q, $resource, $mdBottomSheet, $mdDialog, $mdToast, Employee, Experience, Mission) {
  	$scope.me = null;
    $scope.meOriginal = null;
  	$scope.myId = localStorage.my_id;
    $scope.loading = true;

    $scope.showToastMessage = function(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(6000)
        );
    };
    
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
      Experience.save({employee: $scope.me.id}, function(experience){
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
        
        if(angular.equals($scope.me, $scope.meOriginal)){
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
            var experienceOriginal = $scope.meOriginal._embedded.experiences.filter(function(exp){ return exp.id == experience.id; })[0];

            if(angular.isDefined(experienceOriginal) && angular.equals(experience, experienceOriginal)){
              return;
            }
            if(experience.dateStart){
              experience.dateStart = $filter('date')(experience.dateStart, 'y-MM-dd');
            }
            if(experience.dateEnd){
              experience.dateEnd = $filter('date')(experience.dateEnd, 'y-MM-dd');
            }
            if(experience._embedded.job){
              experience.job = experience._embedded.job.id;
            }
            if(experience._embedded.company){
              experience.company = experience._embedded.company.id;
            }

            experience.employee = $scope.me.id;
            promises.push(Experience.update(experience).$promise);

            angular.forEach(experience._embedded.missions, function(mission){
                if(angular.isDefined(experienceOriginal)){
                  var missionOriginal = experienceOriginal._embedded.missions.filter(function(mis){ return mis.id == mission.id; })[0];

                  if(angular.isDefined(missionOriginal) && angular.equals(mission, missionOriginal)){
                    return;
                  }
                }
                mission.experience = experience.id;
                mission.tags = mission._embedded.tags.map(function(tag){ return tag.id; });
                promises.push(Mission.update(mission).$promise);
            });

        });

        $q.all(promises).then(function(){
            $scope.showToastMessage('Votre CV a bien été mis à jour.');
            $location.path('/employees');
            $scope.loading = false;
        }, function(){
            $scope.showToastMessage('Erreur durant la mise à jour.');
            $scope.loading = false;
        });
    };

    if(angular.isDefined($rootScope.me)){
      $scope.me = $rootScope.me;
      $scope.meOriginal = $rootScope.meOriginal;
      $scope.loading = false;

    }else{
      Employee.get({employeeId: $scope.myId}).$promise.then(function(me){
          var promises = [];
          $scope.loading = true;

          angular.forEach(me._embedded.experiences, function(experience){
              if(angular.isDefined(experience._embedded.job)){
                experience._embedded.job = $resource(experience._embedded.job._links.self.href).get();
                promises.push(experience._embedded.job.$promise);
              }
              if(angular.isDefined(experience._embedded.company)){
                experience._embedded.company = $resource(experience._embedded.company._links.self.href).get();
                promises.push(experience._embedded.company.$promise);
              }
              if(experience.dateStart){
                experience.dateStart = new Date(experience.dateStart.date);
              }
              if(experience.dateEnd){
                experience.dateEnd = new Date(experience.dateEnd.date);
              }
          });

          $q.all(promises).then(function(promises){
              $scope.me = me;
              $scope.meOriginal = angular.copy($scope.me);
              $rootScope.me = $scope.me;
              $rootScope.meOriginal = $scope.meOriginal;
              $rootScope.newExperiences = [];
              $rootScope.deletedExperiences = [];
              $rootScope.newMissions = [];
              $rootScope.deletedMissions = [];
              $scope.loading = false;
          });
      });
    }
  });
