'use strict';

/* Controllers */

var appControllers = angular.module('myApp.controllers', []);

appControllers.controller('HomeCtrl', ['$scope', '$http',

	function HomeController($scope, $http) {
	  	$scope.addClicked = function(){
	  		console.log("SAAAAAAP : ");
	  		$('#main-overlay').show();
	  		$('#addCodesnip').animate({ "top": "+=500px" }, "slow");
	  	}
  }]);

  appControllers.controller('LibraryCtrl', [function() {
  	console.log("Hey, lib!");
  }]);

  appControllers.controller('AddCtrl', [function() {
  	console.log("SAP YO2");
  }]);