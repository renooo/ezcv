'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Company
 * @description
 * # Company
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Company', function ($resource, apiConfig) {
    return $resource(apiConfig.baseUrl + '/company/:companyId', {companyId: '@id'});
  });