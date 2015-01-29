'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('LogoutCtrl', function ($location, $cookieStore) {
    $cookieStore.remove('access_token');
    $cookieStore.remove('my_id');
    $location.path('/employees');
  });
