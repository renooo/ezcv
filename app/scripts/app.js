'use strict';

/**
 * @ngdoc overview
 * @name ezcvApp
 * @description
 * # ezcvApp
 *
 * Main module of the application.
 */
angular
  .module('ezcvApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngMaterial'
  ])
  .config(function ($mdThemingProvider, $routeProvider) {
     $mdThemingProvider.theme('default')
       .primaryPalette('light-green')
       .accentPalette('amber');

    $routeProvider
      /*.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })*/
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl'
      })
      .when('/employee/:employeeId', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl'
      })
      .otherwise({
        redirectTo: '/employees'
      });
  });
