'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeesCtrl
 * @description
 * # EmployeesCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeesCtrl', function ($scope, $location, $mdSidenav, $cookieStore, $timeout, Employee) {
    $scope.employees = [];
    $scope.showFilters = false;
    $scope.me = null;
    $scope.myId = $cookieStore.get('my_id');
    $scope.loadingMe = false;
    $scope.loading = false;
    $scope.page = 1;
    $scope.pageCount = null;
    $scope.previousFullName = null;
    $scope.filters = {
        fullName: $location.search().fullName,
        isCurrentlyEmployed: $location.search().isCurrentlyEmployed,
        isLookingForAJob: $location.search().isLookingForAJob
    };

    $scope.loadMe = function(){
        if($scope.myId){
            $scope.loadingMe = true;
            Employee.get({employeeId: $scope.myId}, function(employee){
                $scope.me = employee;
                $scope.loadingMe = false;
            });
        };
    };

    $scope.openSidenav = function(){
    	$mdSidenav('sidenav').open();
    };

    $scope.toggleFilters = function(){
        $scope.filters.isCurrentlyEmployed = false;
        $scope.filters.isLookingForAJob = false;
        $location.search('isCurrentlyEmployed', null).search('isLookingForAJob', null);
        $scope.showFilters = !$scope.showFilters;
    };

    $scope.viewEmployee = function(employee){
    	$location.path('/employee/'+employee.id).search($scope.filters);
    };

    $scope.searchEmployees = function(){
        $scope.employees = [];
        $scope.page = 1;
        $scope.pageCount = null;
        $scope.loadEmployees();
    };

    $scope.clearSearch = function(){
        $scope.filters.fullName = null;
        $scope.searchEmployees();
    };

    $scope.loadMoreEmployees = function(){
        $scope.page++;
        $scope.loadEmployees();
    };

    $scope.loadEmployees = function(){
    	var params = {},
            p = 0;

        if($scope.pageCount != null && $scope.page > $scope.pageCount){
            $scope.page = $scope.pageCount;
            return;
        }

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

        params.page = $scope.page;
        $scope.loading = true;

        Employee.get(params, function(employees){
            $scope.pageCount = employees.page_count;

            if($scope.pageCount == 1 && $scope.page == 1){
                $scope.employees = [];
            }

            angular.forEach(employees._embedded.employees, function(employee){
                $scope.employees.push(employee);
            });

            $scope.loading = false;
            $location.search($scope.filters);

	    }, function(){
            $scope.loading = false;            
        });
    };

    $scope.loadEmployees();
    $scope.loadMe();
  });
