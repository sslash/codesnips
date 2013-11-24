'use strict';

angular.module('codesnipzApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.showLogin = false;

    $scope.loginClicked = function(){
    	$('#main-overlay').show();
    	$scope.showLogin = true;
    }
  });
