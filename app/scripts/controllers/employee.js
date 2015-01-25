'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeeCtrl', function ($scope, $routeParams, $resource, $q, Employee) {
    $scope.employee = null;
    
    Employee.get({employeeId: $routeParams.employeeId}).$promise.then(function(employee){
    	employee.experiences = [];

    	angular.forEach(employee._embedded.experiences, function(experience){
			experience.missions = experience._embedded.missions;

    		$resource(experience._embedded.job._links.self.href).get().$promise.then(function(job){
    			experience.job = job;
    		});

    		$resource(experience._embedded.company._links.self.href).get().$promise.then(function(company){
    			experience.company = company;
    		});
    		
    		employee.experiences.push(experience);
    	});

    	$scope.employee = employee;
    });
  });
