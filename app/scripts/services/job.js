'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Job
 * @description
 * # Job
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Job', function ($resource, apiConfig) {
    return $resource(apiConfig.baseUrl + '/job/:jobId', {jobId: '@id'});
  });
