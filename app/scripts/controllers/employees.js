'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeesCtrl
 * @description
 * # EmployeesCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeesCtrl', function ($scope, $location, $mdSidenav, Employee) {
    $scope.employees = null;
    $scope.fullNameSearch = null;

    $scope.openSidenav = function(){
    	$mdSidenav('sidenav').open();
    };

    $scope.viewEmployee = function(employee){
    	$location.path('/employee/'+employee.id);
    };

    $scope.searchEmployees = function(){
    	var params = {};

    	if(angular.isString($scope.fullNameSearch))
    		params = {'filter[0][type]': 'like', 'filter[0][field]': 'fullName', 'filter[0][value]': $scope.fullNameSearch+'%'};

    	$scope.employees = null;

	    Employee.get(params, function(employees){
	    	$scope.employees = employees._embedded.employees;
	    });
    };

    $scope.clearSearch = function(){
    	$scope.fullNameSearch = null;
    	$scope.searchEmployees();
    };

    $scope.searchEmployees();
  });
