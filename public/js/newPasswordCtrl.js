'use strict';

angular.module('codesnipzApp')
	.controller('newPasswordCtrl', function($scope, $http, $timeout, $routeParams, $location) {

			$scope.modal = {
				errorMessage: "",
				showErrorMessage: false,
			}
			$scope.user = {
				passwordOne: "",
				passwordTwo: ""
			}

			$scope.init = function() {
				getUser({
					hash: $routeParams.hash
				})
			}
			$scope.setNewPassword = function(formInfo) {
				if(!validateFormInfo(formInfo)) return;

				if ($scope.user.passwordOne === $scope.user.passwordTwo) {
					savePassword({
						password: $scope.user.passwordOne,
						hash: $routeParams.hash
					});
				} else {
					$scope.modal.errorMessage = "The passwords do not match";
					$scope.modal.showErrorMessage = true;
				}
			}

			var savePassword = function(newPassword) {
				$http({
					method: 'POST',
					url: '/users/setNewPassword',
					data: newPassword,
				}).success(function(data, status) {
					$scope.modal.showErrorMessage = false;
					$scope.authUser(data, $scope.user.passwordOne);
					$location.path("/");
				}).error(function(data, status) {
					console.log(status)
				});
			};

			var validateFormInfo = function(formInfo) {
				if (formInfo.passwordOne.$error.required) {
					$scope.modal.errorMessage = "Password is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
				if (formInfo.passwordTwo.$error.required) {
					$scope.modal.errorMessage = "Password is required";
					$scope.modal.showErrorMessage = true;
					return false;
				}
				return true;

		};

		var getUser = function(hash) {
			$http({
				method: 'POST',
				url: '/users/getUserByHash',
				data: hash,
			}).success(function(data, status) {
				console.log("success getting user");
			}).error(function(data, status) {
				/* if hash not found redirect to home*/
				$location.path("/");


			});
		};


});