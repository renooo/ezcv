'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeesCtrl
 * @description
 * # EmployeesCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeesCtrl', function ($scope, $location, Employee) {
    $scope.employees = [];

    Employee.get().$promise.then(function(employees){
    	$scope.employees = employees._embedded.employees;
    });

    $scope.viewEmployee = function(employee){
    	$location.path('/employee/'+employee.id);
    };
  });
