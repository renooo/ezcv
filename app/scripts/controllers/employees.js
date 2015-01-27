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
    $scope.showFilters = false;
    $scope.filters = {
        fullName: $location.search().fullName,
        isCurrentlyEmployed: $location.search().isCurrentlyEmployed,
        isLookingForAJob: $location.search().isLookingForAJob
    };

    $scope.openSidenav = function(){
    	$mdSidenav('sidenav').open();
    };

    $scope.toggleFilters = function(){
        $scope.filters.isCurrentlyEmployed = false;
        $scope.filters.isLookingForAJob = false;
        $location.search({isCurrentlyEmployed: null, isLookingForAJob: null});
        $scope.showFilters = !$scope.showFilters;
    };

    $scope.viewEmployee = function(employee){
    	$location.path('/employee/'+employee.id).search($scope.filters);
    };

    $scope.searchEmployees = function(){
    	var params = {},
            p = 0;

    	if(angular.isString($scope.filters.fullName)){
    		params['filter['+p+'][type]']  = 'like';
            params['filter['+p+'][field]'] = 'fullName';
            params['filter['+p+'][value]'] = $scope.filters.fullName+'%';
            p++;
        }

        if($scope.filters.isCurrentlyEmployed){
            params['filter['+p+'][type]']  = 'eq';
            params['filter['+p+'][field]'] = 'isCurrentlyEmployed';
            params['filter['+p+'][value]'] = 1;
            p++;
        }

        if($scope.filters.isLookingForAJob){
            params['filter['+p+'][type]']  = 'eq';
            params['filter['+p+'][field]'] = 'isLookingForAJob';
            params['filter['+p+'][value]'] = 1;
            p++;
        }

        $location.search($scope.filters);
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
    	$scope.filters.fullName = null;
    	$scope.searchEmployees();
    };

    $scope.searchEmployees();
  });
