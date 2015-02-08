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
        controller: 'EmployeesCtrl',
        resolve: {me: 'me'}
      })
      .when('/employee/:employeeId', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {me: 'me'}
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        resolve: {me: 'me'}
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {me: 'me', countries: 'countries'}
      })
      .when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        resolve: {me: 'me'}
      })
      .when('/edit/experience/:experienceId', {
        templateUrl: 'views/editexperience.html',
        controller: 'EditexperienceCtrl',
        resolve: {jobs: 'jobs', companies: 'companies'}
      })
      .otherwise({
        redirectTo: '/employees'
      });
  });
