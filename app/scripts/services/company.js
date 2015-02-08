'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Company
 * @description
 * # Company
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Company', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/company/:companyId', {companyId: '@id'}, {
    	query: {method: 'GET', isArray: false}
    });
  });