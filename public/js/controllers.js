'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', [function() {
  	console.log("SAP YO");
  }])

  .controller('LibraryCtrl', [function() {
  	console.log("Hey, lib!");
  }])

  .controller('AddCtrl', [function() {
  	console.log("SAP YO2");
  }]);