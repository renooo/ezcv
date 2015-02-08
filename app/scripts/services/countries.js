'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Countries
 * @description
 * # Countries
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .provider('countries', {
    $get: function (Country) {
      return Country.query({}).$promise;
    }
  });
