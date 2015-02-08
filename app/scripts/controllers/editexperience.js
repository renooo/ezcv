'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditexperienceCtrl
 * @description
 * # EditexperienceCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditexperienceCtrl', function ($scope, $rootScope, $location, $routeParams, $mdDialog, jobs, companies, Mission) {
    $scope.me = $rootScope.me;
  	$scope.experience = null;
  	$scope.jobs = jobs;
  	$scope.companies = companies;
  	$scope.loading = true;
    $scope.creating = false;

  	$scope.editCV = function(){
		  $location.path('/edit');
  	};

    $scope.removeTag = function(mission, tag){
      var confirm = $mdDialog.confirm()
        .title('Retirer')
        .content('Êtes-vous certain(e) de vouloir retirer ce mot-clé de la liste ?')
        .ariaLabel('Confirmation')
        .ok('Retirer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        mission._embedded.tags = mission._embedded.tags.filter(function(t){
          return (t.id != tag.id);
        });
      });
    };

    $scope.addTags = function(mission){
      $mdDialog.show({
        controller: 'AddtagsdialogCtrl',
        templateUrl: 'views/addtagsdialog.html'
      })
      .then(function(tags) {
        if(!angular.isDefined(tags) || !angular.isArray(tags)){
          return;
        }

        angular.forEach(tags, function(tag){
          if(!angular.isDefined(mission._embedded.tags.filter(function(t){ return t.id == tag.id; })[0])){
            mission._embedded.tags.push(tag);
          }
        });
      });
    };

    $scope.newMission = function(){
      if(!$scope.experience){
        return;
      }
      $scope.creating = true;
      Mission.save({_embedded: {experience: $scope.experience}}, function(mission){
        if(!angular.isArray($scope.experience._embedded.missions)){
          $scope.experience._embedded.missions = [];
        }
        $scope.experience._embedded.missions.push(mission);
        $rootScope.newMissions.push(mission);
        $scope.creating = false;
      });
    };

    $scope.deleteMission = function(mission){
      var confirm = $mdDialog.confirm()
        .title('Supprimer')
        .content('Êtes-vous certain(e) de vouloir supprimer cette mission ?')
        .ariaLabel('Confirmation')
        .ok('Supprimer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        $scope.experience._embedded.missions = $scope.experience._embedded.missions.filter(function(m){
          return (m.id != mission.id);
        });
        $rootScope.deletedMissions.push(mission);
      });
    };
    
    if(!angular.isDefined($scope.me)){
      $location.path('/edit');
      return;
    }

    $scope.experience = $scope.me._embedded.experiences.filter(function(experience){
      return (experience.id == $routeParams.experienceId);
    })[0];

    if(!angular.isDefined($scope.experience)){
      $location.path('/edit');
      return;
    }

    $scope.loading = false;
  });
