'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Job
 * @description
 * # Job
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Job', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/job/:jobId', {jobId: '@id'}, {
    	query: {method: 'GET', isArray: false}
    });
  });
