'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EditexperienceCtrl
 * @description
 * # EditexperienceCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EditexperienceCtrl', function ($scope, $rootScope, $location, $routeParams, $q, Job, Company) {
  	$scope.me = $rootScope.me;
  	$scope.experience = null;
    //$scope.experienceOriginal = null;
  	$scope.jobs = [];
  	$scope.companies = [];
  	$scope.loading = true;

  	$scope.editCV = function(){
      //if(angular.equals($scope.experience, $scope.experienceOriginal)){
  		  location.path('/edit');
      //}
  	};
    
    if(!angular.isDefined($scope.me) ){
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

    $q.all([
      Job.get({}, function(jobs){
        $scope.jobs = jobs._embedded.jobs;
      }).$promise,

      Company.get({}, function(companies){
        $scope.companies = companies._embedded.companies;
      }).$promise

    ]).then(function(){
        //$scope.experienceOriginal = angular.copy($scope.experience);
        $scope.loading = false;
    });

  });
