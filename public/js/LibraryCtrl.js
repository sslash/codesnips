'use strict';
// Declare app level module which depends on filters, and services
var appControllers = angular.module('myApp');

appControllers.controller('LibraryCtrl', function($scope) {
  	$scope.init = function() {
        console.log ("init");
    }

  });


