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

    $scope.filterExperiences = function(experience){
        return (experience._embedded.job && experience._embedded.company && experience.dateStart);
    };
    
    Employee.get({employeeId: $routeParams.employeeId}, function(employee){
        var promises = [];

        employee.birthdate = new Date(employee.birthdate.date);
        
    	angular.forEach(employee._embedded.experiences, function(experience){
          if(angular.isDefined(experience._embedded.job)){
            experience._embedded.job = $resource(experience._embedded.job._links.self.href).get();
            promises.push(experience._embedded.job.$promise);
          }
          if(angular.isDefined(experience._embedded.company)){
            experience._embedded.company = $resource(experience._embedded.company._links.self.href).get();
            promises.push(experience._embedded.company.$promise);
          }
          if(experience.dateStart){
            experience.dateStart = new Date(experience.dateStart.date);
          }
          if(experience.dateEnd){
            experience.dateEnd = new Date(experience.dateEnd.date);
          }
    	});

        $q.all(promises).then(function(){
            $scope.employee = employee;
        });    
    	
    }, function(){
        $location.path('/employees');
    });
  });
