'use strict';

angular.module('codesnipzApp')
	.controller('HomeCtrl', function($scope, $http, $timeout, $location) {
		
		$scope.snippet = {
			title:"",
			category:"",
			description:"",
			stackOverflowUrl:"",
			codeSnippet:"",
			tags:[],
		};

		$scope.codeEditorClicked = false;
		var tagTextFocused = false;
		var timeOut;

		$scope.init = function() {
			$('#categorySelect').chosen({
				'width': '126px'
			});
			$scope.modalDisplayed = false;
			$scope.AddFunctionFailed = false;
			$scope.showForm = true;
		};

		$scope.setTagTextFocused = function(isFocused) {
			tagTextFocused = isFocused;
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

		$scope.resetForm = function() {
			$scope.snippet = {
				title:"",
				category:"",
				description:"",
				stackOverflowUrl:"",
				codeSnippet:"",
				tags:[],
			};
		};

		$scope.searchFieldKeyUp = function($event) {
			if($event.keyCode === 13){
				 $location.path('/library').search( {'q' : $scope.searchField});
			}
		};

		$scope.tagKeyUp = function($event) {
			if ($event.keyCode === 13 /* enter */ && $scope.tagText !== undefined && $scope.tagText.length > 0) {
				var tag = $scope.tagText;
				if (tag.charAt(0) != "#") {
					tag = "#" + tag;
				}
				if ($scope.snippet.tags.indexOf(tag) == -1) {
					$scope.snippet.tags.push(tag);
				}
				$scope.tagText = "";
			}
		};

		$scope.tagClick = function($event, index) {
			$scope.snippet.tags.splice(index, 1);
		};

		$scope.codeEditorOnClick = function($event) {
			$($event.currentTarget).css('background-color', 'white');
			document.getElementById('code-editor-textarea').focus();
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
			if (tagTextFocused) {
				return; // prevent enter-key to submit form when tag-field is focused
			}

			var snippet = {
				owner: $scope.modal.username,
				title: $scope.snippet.title,
				description: $scope.snippet.description,
				category: $('#categorySelect').val(),
				stackOverflowUrl: $scope.snippet.stackOverflowUrl,
				code: $scope.snippet.codeSnippet,
				tags: $scope.snippet.tags,
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
				$scope.resetForm();
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

		}
	});
