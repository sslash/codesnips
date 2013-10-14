'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/add', {templateUrl: 'partials/addView.html', controller: 'AddCtrl'});
  $routeProvider.when('/library', {templateUrl: 'partials/libraryView.html', controller: 'LibraryCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
