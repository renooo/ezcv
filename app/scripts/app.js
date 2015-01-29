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
    'ngMaterial',
    'ngCookies'
  ])
  .config(function ($mdThemingProvider, $routeProvider) {
     $mdThemingProvider.theme('default')
       .primaryPalette('light-green')
       .accentPalette('amber');

    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl'
      })
      .when('/employee/:employeeId', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/subscribe', {
        templateUrl: 'views/subscribe.html',
        controller: 'SubscribeCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/employees'
      });
  });
