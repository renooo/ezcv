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
    $scope.fullNameSearch = $location.search().q;

    $scope.openSidenav = function(){
    	$mdSidenav('sidenav').open();
    };

    $scope.viewEmployee = function(employee){
    	$location.path('/employee/'+employee.id).search('q', $scope.fullNameSearch);
    };

    $scope.searchEmployees = function(){
    	var params = {};

    	if(angular.isString($scope.fullNameSearch)){
    		params = {'filter[0][type]': 'like', 'filter[0][field]': 'fullName', 'filter[0][value]': $scope.fullNameSearch+'%'};
    	}

    	$scope.employees = null;

	    Employee.get(params, function(employees){
	    	$scope.employees = employees._embedded.employees;

            angular.forEach($scope.employees, function(employee){
                employee.experiences = employee._embedded.experiences;
                delete employee._embedded.experiences;
            });
	    });
    };

    $scope.clearSearch = function(){
    	$scope.fullNameSearch = null;
    	$scope.searchEmployees();
    };

    $scope.searchEmployees();
  });
