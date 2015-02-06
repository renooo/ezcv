'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Mission
 * @description
 * # Mission
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Mission', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/mission/:missionId', {missionId: '@id'}, {update: {method: 'PUT'}});
  });
