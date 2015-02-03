'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('LogoutCtrl', function ($location) {
    delete localStorage.access_token;
    delete localStorage.my_id;
    $location.path('/employees');
  });
