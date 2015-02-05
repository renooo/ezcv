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
  	$scope.jobs = [];
  	$scope.companies = [];
  	$scope.loading = true;

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
  		})
  	]).then(function(){
  		$scope.loading = false;
  	});

  	$scope.editCV = function(){
  		$location.path('/edit');
  	};
  });
