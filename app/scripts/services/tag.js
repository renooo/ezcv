'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Tag
 * @description
 * # Tag
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Tag', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/tag/:tagId', {tagId: '@id'}, {
    	query: {method: 'GET', isArray: false}
    });
  });
