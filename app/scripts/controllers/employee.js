'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('EmployeeCtrl', function ($scope, $routeParams, $resource, $location, $window, $q,  Employee) {
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
    
    Employee.get({employeeId: $routeParams.employeeId}, function(employee){
        employee.birthdate = new Date(employee.birthdate);
        
    	angular.forEach(employee._embedded.experiences, function(experience){
            experience._embedded.job = $resource(experience._embedded.job._links.self.href).get();
            experience._embedded.company = $resource(experience._embedded.company._links.self.href).get();
            experience.dateStart = new Date(experience.dateStart.date);
            experience.dateEnd = new Date(experience.dateEnd.date);
    	});

        $q.all(employee._embedded.experiences.map(function(experience){
            return $q.all([experience._embedded.job.$promise, experience._embedded.company.$promise]);
        })).then(function(promises){
            $scope.employee = employee;
        });    
    	
    }, function(){
        $location.path('/employees');
    });
  });
