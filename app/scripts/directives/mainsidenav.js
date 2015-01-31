'use strict';

/**
 * @ngdoc directive
 * @name ezcvApp.directive:mainSidenav
 * @description
 * # mainSidenav
 */
angular.module('ezcvApp')
  .directive('mainSidenav', function () {
    return {
      templateUrl: 'views/mainsidenav.html',
      restrict: 'E',
      controller: 'SidenavCtrl'
    };
  });
