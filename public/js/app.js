'use strict';

angular.module('codesnipzApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/add', {
        templateUrl: 'partials/addView.html',
        controller: 'AddCtrl'
      })
      .when('/library', {
        templateUrl: 'partials/libraryView.html',
        controller: 'LibraryCtrl'

      })
      .when('/newPassword/:hash', {
        templateUrl: 'partials/newPasswordModal.html',
        controller: 'newPasswordCtrl'

      })
      .otherwise({
        redirectTo: '/home'
      });
  });