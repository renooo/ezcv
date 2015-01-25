'use strict';

/**
 * @ngdoc filter
 * @name ezcvApp.filter:dateFormat
 * @function
 * @description
 * # dateFormat
 * Filter in the ezcvApp.
 */
angular.module('ezcvApp')
  .filter('dateFormat', function ($filter) {
    return function (input, format) {
      var date = new Date(input.date);
      return $filter('date')(date, format);
    };
  });
