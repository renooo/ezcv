'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Employee
 * @description
 * # Employee
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Employee', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/employee/:employeeId', {userId: '@id'});
  });
