'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Experience
 * @description
 * # Experience
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Experience', function ($resource, apiConfig) {
    return $resource(apiConfig.baseUrl + '/experience/:experienceId', {experienceId: '@id'});
  });
