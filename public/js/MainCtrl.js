'use strict';

angular.module('codesnipzApp')
	.controller('MainCtrl', function($scope, $http, $location, $timeout, UserInfo) {
		var counter = 0;
		var timeOut;
		$scope.showLogin = false;
		$scope.modal = {
			email: '',
			sessionId: '',
			gravatar: '',
			showerror: false,
			showRegister: false,
			showAvatar: false,
			showRecovery: false,
			showErrorMessage: false,
			showSuccessMessage: false,
			warningMessage: false
		};
		$scope.user = {
			username: '',
			gravatar: '',
			email: ''
		}

		$scope.init = function() {
			
			/* setting username on site*/
			if (window.user !== null) {
				UserInfo.setProperty(window.user);
				updateUserInfo(window.user);
			}
		};

		$scope.recoverPasswordButton = function() {
			$scope.showLogin = false;
			showRecoveryModal();
		}

		$scope.CheckAuth = function() {
			auth($cookies['sessionID']);
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
		$scope.authUser = function(username, password) {
			authenticateToServer({
				username: username,
				password: password
			});
		}

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
				return;
			}
			if (!validateFormInfo(formInfo, false)) {
				return;
			}

			$scope.errorMessage = "";


			registerUserToServer({
				username: $scope.user.username,
				password: $scope.user.password,
				email: $scope.user.email
			});
		};

		$scope.recoverPassword = function(formInfo) {
			if (!validateFormInfo(formInfo, true)) {
				return;
			}
			$scope.errorMessage = "Sending e-post";
			$scope.modal.warningMessage = true;
			sendRecoveryMail({
				email: $scope.user.email
			});
		}
		var validateFormInfo = function(formInfo, OnlyEmail) {


			if (!OnlyEmail) {
				if (formInfo.username.$error.required) {
					$scope.errorMessage = "Username is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
				if (formInfo.password.$error.required) {
					$scope.errorMessage = "Password is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
			}
			if (formInfo.email.$error.required) {
				$scope.errorMessage = "Email is required";
				$scope.modal.showErrorMessage = true;
				return false;
			}
			if (formInfo.email.$error.email) {
				$scope.errorMessage = "Please write a vaild email";
				$scope.modal.showErrorMessage = true;
				return false;
			}
			return true;

		}
		$scope.closeClicked = function() {
			hide();
			$timeout.cancel(timeOut);
		};



		var show = function() {
			$('#main-overlay').show();
			$scope.showLogin = true;
		};

		var showRecoveryModal = function() {
			$('#main-overlay').show();
			$scope.modal.showRecovery = true;
		};

		var hide = function() {
			if ($scope.showLogin) {
				$('#main-overlay').hide();
				$scope.showLogin = false;
				$scope.modal.showRegister = false;

			} else {
				$('#main-overlay').hide();
				$scope.modal.showRecovery = false;
			}
			$scope.modal.showErrorMessage = false;
			$scope.modal.showSuccessMessage = false;
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
				$scope.errorMessage = "Wrong username or password!"
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
				$scope.user.username = "";
			} else {
				$scope.user.username = login.username;
				$scope.user.gravatar = login.gravatar;
				$scope.modal.showAvatar = true;

			}


		}

		var sendRecoveryMail = function(recoverInfo) {
			$http({
				method: 'POST',
				url: '/users/recoverPassword',
				data: recoverInfo,
			}).success(function(data, status) {
				$scope.modal.warningMessage = false;
				$scope.errorMessage = "You will recive a recovery mail in a few moments";
				$scope.modal.showSuccessMessage = true;
				closeModal();
			}).error(function(data, status) {
				$scope.modal.warningMessage = false;
				$scope.errorMessage = "Wrong mail, please try with a another mail";
				$scope.modal.showErrorMessage = true;

			});
		};
		var closeModal = function() {
			timeOut = $timeout(function() {
				$scope.closeClicked();

			}, 2000);
		};
	});