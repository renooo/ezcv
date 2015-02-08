'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Jobs
 * @description
 * # Jobs
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .provider('jobs', {
    $get: function (Job) {
      return Job.get({}).$promise;
    }
  });
