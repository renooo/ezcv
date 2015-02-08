'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Companies
 * @description
 * # Companies
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .provider('companies', {
    $get: function (Company) {
      return Company.query({}).$promise;
    }
  });
