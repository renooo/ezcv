'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Tags
 * @description
 * # Tags
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .provider('tags', {
  	$get: function (Tag) {
    	return Tag.query({}).$promise;
  	}
  });
