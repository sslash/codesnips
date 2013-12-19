'use strict';

var app = angular.module('codesnipzApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
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
    .otherwise({
      redirectTo: '/'
    });
  });

app.directive('onFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('focus', function() {
                scope.$apply(attrs.onFocus);
            });
        }
    };        
});

app.directive('onBlur', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('blur', function() {
                scope.$apply(attrs.onBlur);
            });
        }
    };        
});