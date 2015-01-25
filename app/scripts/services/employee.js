'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Employee
 * @description
 * # Employee
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Employee', function ($resource, apiConfig) {
    return $resource(apiConfig.baseUrl + '/employee/:employeeId', {userId: '@id'});
  });
