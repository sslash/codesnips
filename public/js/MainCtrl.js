'use strict';

angular.module('codesnipzApp')
.controller('MainCtrl', function ($scope, $http) {
	$scope.showLogin = false;
	$scope.modal = {
		username : '',
		password : '',
		showerror : false
	};

	$scope.openLoginClicked = function(){
		show();
	};

	$scope.loginClicked = function(){
		authenticateToServer({
			username : $scope.modal.username,
			password : $scope.modal.password
		});
	};

	$scope.registerClicked = function(){
		registerUserToServer({
			username : $scope.modal.username,
			password : $scope.modal.password
		});
	};

	$scope.closeClicked = function(){
		hide();
	};

	var show = function(){
		$('#main-overlay').show();
		$scope.showLogin = true;
	};

	var hide = function(){
		$('#main-overlay').hide();
		$scope.showLogin = false;
	};

	var authenticateToServer = function(authData){
		$http({
			method: 'POST',
			url: '/users/session/',
			data: authData,
		}).success(function(data, status) {
			$scope.user = data;
			$scope.modal.showerror = false;
			hide();
		}).error(function(data, status) {
			$scope.modal.showerror = true;

			console.log("Failed to Auth! " + status);
		});
	};

	var registerUserToServer = function(authData){
		$http({
			method: 'POST',
			url: '/users',
			data: authData,
		}).success(function(data, status) {
			$scope.user = data;
			hide();
		}).error(function(data, status) {
		});
	};
});
