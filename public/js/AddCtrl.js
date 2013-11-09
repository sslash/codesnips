'use strict';
// Declare app level module which depends on filters, and services
var appControllers = angular.module('myApp');

appControllers.controller('AddCtrl', function($scope) {
	
	$scope.init = function() {
		console.log ("init");
	};
});