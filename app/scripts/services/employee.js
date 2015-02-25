'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Employee
 * @description
 * # Employee
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Employee', function ($resource, $filter, appConfig) {

        var prepareEntity = function(employee) {
            if (angular.isDefined(employee.validation_messages) || angular.isNumber(employee.status)) {
                return employee;
            }

            employee.zipCode = parseInt(employee.zipCode);

            if (angular.isObject(employee.birthdate)) {
                employee.birthdate = new Date(employee.birthdate.date);
            }

            if (angular.isArray(employee._embedded.experiences)) {
                angular.forEach(employee._embedded.experiences, function (experience) {

                    if (angular.isObject(experience.dateStart)) {
                        experience.dateStart = new Date(experience.dateStart.date);
                    }

                    if (angular.isObject(experience.dateEnd)) {
                        experience.dateEnd = new Date(experience.dateEnd.date);
                    }
                });
            }

            return employee;
        }

        var prepareCollection = function(collection){
            angular.forEach(collection._embedded.employees, prepareEntity);
            return collection;
        };

        var prepareEntityToJson = function(employee){
            if(angular.isDate(employee.birthdate)){
                employee.birthdate = $filter('date')(employee.birthdate, 'y-MM-dd');
            }

            if(angular.isObject(employee._embedded.country)){
                employee.country = employee._embedded.country.id;
            }

            delete employee._embedded;
            return employee;
        };

        return $resource(appConfig.apiEndpoint + '/employee/:employeeId', {employeeId: '@id'}, {
            update: {method: 'PUT', transformRequest: [prepareEntityToJson, angular.toJson], transformResponse: [angular.fromJson, prepareEntity]},
            query: {method: 'GET', transformResponse: [angular.fromJson, prepareCollection], isArray: false},
            get: {method: 'GET', transformResponse: [angular.fromJson, prepareEntity]}
        });
    });
