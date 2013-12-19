'use strict';

angular.module('codesnipzApp')
	.controller('MainCtrl', function($scope, $http, $location) {
		var counter = 0;
		$scope.showLogin = false;
		$scope.modal = {
			email: '',
			sessionId: '',
			gravatar: '',
			showerror: false,
			showRegister: false,
			showAvatar: false
		};
		$scope.user = {
			username: '',
			gravatar: '',
			email: ''
		}

		$scope.init = function() {
			/* setting username on site*/
			if (window.user !== null) {
				updateUserInfo(window.user);
			}
		};


		$scope.openLoginClicked = function() {
			show();
		};

		$scope.loginClicked = function() {
			loginUser();
		};

		$scope.logOff = function() {
			terminateUserSession();
		};

		var loginUser = function() {
			authenticateToServer({
				username: $scope.user.username,
				password: $scope.user.password
			});
		}

		var terminateUserSession = function() {
			$http({
				method: 'GET',
				url: '/logout'
			}).success(function(data, status) {
				updateUserInfo(false);
			}).error(function(data, status) {
				console.log("Failed to end session! " + status);
			});


		}

		$scope.registerClicked = function(formInfo) {
			if (!$scope.modal.showRegister) {
				$scope.modal.showRegister = true;
				console.log("show register");
				return;
			}

			console.log(formInfo.username.$error.required);
			if (formInfo.username.$error.required) {
				$scope.errorMessage = "Username is required";
				return;
			}
			if (formInfo.password.$error.required) {
				$scope.errorMessage = "Password is required";
				return;
			}

			if (formInfo.email.$error.required) {
				$scope.errorMessage = "Email is required";
				return;
			}
			if (formInfo.email.$error.email) {
				$scope.errorMessage = "Please write a vaild email";
				return;
			}

			$scope.errorMessage = "";


			registerUserToServer({
				username: $scope.user.username,
				password: $scope.user.password,
				email: $scope.user.email
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
				$scope.modal.showRegister = false;
				loginUser();
				hide();
			}).error(function(data, status) {});
		};
		var updateUserInfo = function(login) {
			if (!login) {
				$scope.modal.showAvatar = false;
				$scope.user.username = "Login";
			} else {
				$scope.user.username = login.username;
				$scope.user.gravatar = login.gravatar;
				$scope.modal.showAvatar = true;

			}


		}


	});