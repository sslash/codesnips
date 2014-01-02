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
			message: '',
			showerror: false,
			showRegister: false,
			showAvatar: false,
			showRecovery: false,
			showErrorMessage: false,
			showSuccessMessage: false,
			warningMessage: false,
			showUserInfo: false
		};
		$scope.user = {
			username: '',
			gravatar: '',
			email: '',
			password: '',
			firstName: '',
			lastName: ''
		};

		$scope.init = function() {

			/* setting username on site*/
			if (window.user !== null) {
				UserInfo.setProperty(window.user);
				$scope.modal.showAvatar = true;
				updateUserInfo();

			}
		};

		$scope.updateUserProfile = function() {
			profileUpdate({
				firstName: $scope.user.firstName,
				lastName: $scope.user.lastName
			});

		};

		$scope.recoverPasswordButton = function() {
			$scope.showLogin = false;
			$scope.modal.showErrorMessage = false;

			showRecoveryModal();
		};

		$scope.openLoginClicked = function() {
			$scope.modal.showErrorMessage = false;
			$scope.showLogin = true;
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
		};

		var loginUser = function() {
			authenticateToServer({
				username: $scope.user.username,
				password: $scope.user.password
			});
		};

		var terminateUserSession = function() {
			$http({
				method: 'GET',
				url: '/logout'
			}).success(function(data, status) {
				stopSession();
			}).error(function(data, status) {
				console.log("Failed to end session! " + status);
			});


		};
		var stopSession = function() {
			UserInfo.setProperty("");
			$scope.modal.showAvatar = false;

		};

		$scope.registerClicked = function(formInfo) {
			if (!$scope.modal.showRegister) {
				$scope.modal.showRegister = true;
				return;
			}
			if (!validateFormInfo(formInfo, false)) {
				return;
			}
			$scope.modal.showErrorMessage = false;
			$scope.modal.message = "";


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
			$scope.modal.showErrorMessage = false;
			$scope.modal.message = "Sending e-post";
			$scope.modal.warningMessage = true;
			sendRecoveryMail({
				email: $scope.user.email
			});
		}
		var validateFormInfo = function(formInfo, OnlyEmail) {


			if (!OnlyEmail) {
				if (formInfo.username.$error.required) {
					$scope.modal.message = "Username is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
				if (formInfo.password.$error.required) {
					$scope.modal.message = "Password is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
			}
			if (formInfo.email.$error.required) {
				$scope.modal.message = "Email is required";
				$scope.modal.showErrorMessage = true;
				return false;
			}
			if (formInfo.email.$error.email) {
				$scope.modal.message = "Please write a vaild email";
				$scope.modal.showErrorMessage = true;
				return false;
			}
			return true;

		}
		$scope.closeClicked = function() {
			hide();
			$timeout.cancel(timeOut);
		};

		$scope.openUserInfo = function() {
			show();
			$scope.modal.showUserInfo = true;
		}

		var show = function() {
			$('#main-overlay').show();
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
			$scope.modal.showUserInfo = false;
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
				$scope.modal.message = "Wrong username or password!";
				$scope.modal.showErrorMessage = true;

				console.log("Failed to Auth! " + status);
			});
		};

		var registerUserToServer = function(authData) {
			console.log("ok2k");
			$http({
				method: 'POST',
				url: '/users',
				data: authData,
			}).success(function(data, status) {
				console.log(data);
				console.log(status);
				$scope.modal.showRegister = false;
				loginUser();
				hide();
			}).error(function(data, status) {
				$scope.modal.message = "Username or email is already taken";
				$scope.modal.showErrorMessage = true;
			});
		};
		var updateUserInfo = function() {
			$scope.user = UserInfo.getProperty();
		}

		var sendRecoveryMail = function(recoverInfo) {
			$http({
				method: 'POST',
				url: '/users/recoverPassword',
				data: recoverInfo,
			}).success(function(data, status) {
				$scope.modal.warningMessage = false;
				$scope.modal.message = "You will recive a recovery mail in a few moments";
				$scope.modal.showSuccessMessage = true;
				closeModal();
			}).error(function(data, status) {
				$scope.modal.warningMessage = false;
				$scope.modal.message = "This email is not registered.";
				$scope.modal.showErrorMessage = true;

			});
		};

		var profileUpdate = function(profileInfo) {
			$http({
				method: 'POST',
				url: '/users/updateProfile',
				data: profileInfo,
			}).success(function(data, status) {
				$scope.modal.message = "Information saved";
				$scope.modal.showSuccessMessage = true;
				 closeModal();
			}).error(function(data, status) {
				$scope.modal.message = "Sorry, An error has occurd";
				$scope.modal.showErrorMessage = true;

			});

		}


		var closeModal = function() {
			timeOut = $timeout(function() {
				$scope.closeClicked();

			}, 2000);
		};
	});