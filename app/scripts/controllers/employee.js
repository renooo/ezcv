'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeeCtrl', function ($scope, $routeParams, $location, $window, Employee) {
    $scope.employee = null;
    $window.scrollTo(0, 0);

    $scope.viewEmployees = function(){
        var filters = {
            fullName: $location.search().fullName,
            isCurrentlyEmployed: $location.search().isCurrentlyEmployed,
            isLookingForAJob: $location.search().isLookingForAJob
        };
        $location.path('/employees').search(filters);
    };

    $scope.filterExperiences = function(experience){
        return (experience._embedded.job && experience._embedded.company && experience.dateStart);
    };
    
    Employee.get({employeeId: $routeParams.employeeId}, function(employee){
        $scope.employee = employee;	
    }, function(){
        $location.path('/employees');
    });
  });
