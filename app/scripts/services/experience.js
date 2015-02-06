'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Experience
 * @description
 * # Experience
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Experience', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/experience/:experienceId', {experienceId: '@id'}, {update: {method: 'PUT'}});
  });
