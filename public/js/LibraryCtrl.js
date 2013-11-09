'use strict';
// Declare app level module which depends on filters, and services
var appControllers = angular.module('myApp');

appControllers.controller('LibraryCtrl', function($scope, $http) {

	$scope.snippetsCollection = [];

  	$scope.init = function() {
        console.log ("init");
        $scope.fetchSnippetsCollection();
    };

    $scope.fetchSnippetsCollection = function(){
    	$http({
    		method : 'GET',
    		url : '/snippets/',
	    }).success(function(data,status){
	    		$scope.snippetsCollection = data;
	    });
    };

  });


