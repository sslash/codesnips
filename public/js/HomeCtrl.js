'use strict';

angular.module('codesnipzApp')
	.controller('HomeCtrl', function($scope, $http, $timeout, $location) {
		
			$scope.submit = {
				title:"",category:"",
				description:"",
				stackOverflowUrl:"",
				codeSnippet:"",
				tagsArray:['#test', '#test2k']
			};
	

		$scope.codeEditorClicked = false;
		var timeOut;

		$scope.init = function() {
			$('#categorySelect').chosen({
				'width': '126px'
			});
			$scope.modalDisplayed = false;
			$scope.AddFunctionFailed = false;
			$scope.showForm = true;
		};

		$scope.addClicked = function() {
			$('#main-overlay').show();
			$scope.showForm = true;
			$('#addCodesnip').animate({
				"top": "+=600px"
			}, "fast");
		};

		$scope.closeOnClick = function() {
			$('#addCodesnip').animate({
				"top": "-=600px"
			}, "fast");
			$('#main-overlay').hide();
			if ($scope.codeEditorClicked) {
				$scope.codeEditorClicked = false;
				$scope.codeSnippet = '';

			}

			if ($scope.modalDisplayed | $scope.AddFunctionFailed) {
				$timeout.cancel(timeOut);
				$scope.modalDisplayed = false;
				$scope.AddFunctionFailed = false;
				$scope.showForm =true;				
			}
		};

		$scope.searchFieldKeyUp = function($event){
			if($event.keyCode === 13){
				 $location.path('/library').search( {'q' : $scope.searchField});
			}
		};

		$scope.tagKeyUp = function($event) {
			if ($event.keyCode === 13) {
				$scope.tagsArray.push("#" + $scope.tagText)
				$scope.tagText = "";
			}
		};

		$scope.tagClick = function($event, index) {
			$scope.tagsArray.splice(index, 1);
		};

		$scope.codeEditorOnClick = function($event) {
			$($event.currentTarget).css('background-color', 'white');
			$scope.codeEditorClicked = true;
		};

		$scope.AddFormUp = function($event) {
			if ($event.keyCode === 27) {
				if ($('#addCodesnip').position().top === 60) {
					$scope.closeOnClick();
				}
			}
		};

		$scope.createCodeSnippet = function() {
			var snippet = {
				owner: $scope.modal.username,
				title: $scope.submit.title,
				description: $scope.submit.description,
				category: $('#categorySelect').val(),
				stackOverflowUrl: $scope.submit.stackOverflowUrl,
				code: $scope.submit.codeSnippet,
				tags: $scope.submit.tagsArray
			};
			$http({
				method: 'POST',
				url: '/snippets/',
				data: snippet,
			}).success(function(data, status) {
				console.log("success: " + JSON.stringify(data));
				$scope.modalDisplayed = true;
				$scope.showForm = false;
				$scope.closeModal();
			}).error(function(data, status) {
				$scope.AddFunctionFailed = true;
				$scope.showForm = false;
				$scope.closeModal();
				errorMessage(status);
			});
		}
		var errorMessage = function(status) {
			if (status === 401) {
				$scope.statusMessage = "Sorry! You're not authorized, please log in"
			}
		};
		$scope.closeModal = function() {
			timeOut = $timeout(function() {
				$scope.closeOnClick();

			}, 3000);

		};
	});
