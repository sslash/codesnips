'use strict';

angular.module('codesnipzApp')
	.controller('MainCtrl', function($scope, $http, $cookies, $location, $route) {

		$scope.showLogin = false;
		$scope.modal = {
			username: '',
			password: '',
			email: '',
			sessionId: '',
			gravatar: '',
			showerror: false,
			showRegister: false,
			showAvatar: false
		};
		$scope.user = {
			username: ''
		}

		$scope.init = function() {
			/* setting username on site*/
			if (window.user !== null) {
				$scope.modal.showAvatar = true;
				$scope.user.username = window.user.username;
				$scope.user.gravatar = window.user.gravatar;
			}
		};

		$scope.openLoginClicked = function() {
			show();
		};

		$scope.loginClicked = function() {
			authenticateToServer({
				username: $scope.modal.username,
				password: $scope.modal.password
			});

		};

		$scope.logOff = function() {
			terminateUserSession();
		};

		var terminateUserSession = function() {
			$http({
				method: 'GET',
				url: '/logout'
			}).success(function(data, status) {
				updateUserInfo();
			}).error(function(data, status) {
				console.log("Failed to end session! " + status);
			});


		}

		$scope.registerClicked = function(formInfo) {
			if (!$scope.modal.showRegister) {
				$scope.modal.showRegister = true;
				return;
			}


			if (formInfo.email) {
				return;
			}


			registerUserToServer({
				username: $scope.modal.username,
				password: $scope.modal.password,
				email: $scope.modal.email
			});
		};

		$scope.closeClicked = function() {
			hide();
			$scope.modal.showRegister = false;
		};



		var show = function() {
			$('#main-overlay').show();
			$scope.showLogin = true;
		};

		var hide = function() {
			$('#main-overlay').hide();
			$scope.showLogin = false;
		};


		var authenticateToServer = function(authData) {
			$http({
				method: 'POST',
				url: '/users/session/',
				data: authData,
			}).success(function(data, status) {
				$scope.user = data;
				$scope.modal.showerror = false;
				$scope.modal.showAvatar = true;
				hide();
			}).error(function(data, status) {
				$scope.modal.showerror = true;
				console.log("Failed to Auth! " + status);
			});
		};

		var registerUserToServer = function(authData) {
			$http({
				method: 'POST',
				url: '/users',
				data: authData,
			}).success(function(data, status) {
				$scope.user = data;
				hide();
			}).error(function(data, status) {});
		};
		var updateUserInfo = function() {
			$scope.modal.showAvatar = false;
			$scope.user.username = "Login";

		}


	});