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
    'infiniteScroll'
  ])
  .config(function ($mdThemingProvider, $httpProvider, $routeProvider) {
     $mdThemingProvider.theme('default')
       .primaryPalette('light-green')
       .accentPalette('amber');

    $httpProvider.interceptors.push('AuthInterceptor');

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
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/employees'
      });
  });
