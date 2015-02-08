'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Country
 * @description
 * # Country
 * Service in the ezcvApp.
 */
angular.module('ezcvApp')
  .service('Country', function ($resource, appConfig) {
    return $resource(appConfig.apiEndpoint + '/country/:countryId', {countryId: '@id'}, {
    	query: {method: 'GET', isArray: false}
    });
  });
