'use strict';

angular.module('codesnipzApp')
	.controller('HomeCtrl', function($scope, $http, $timeout, $location, $routeParams, UserInfo, CodeSnippet) {
		$scope.indexOfSnippet = null;
		$scope.snippetsCollection = [];
		var timeOut = null;
		$scope.homeCtrlVar = {
			editSave: false,
			message: ''
		}
		var user = {};

		$scope.init = function() {
			$('#categorySelect').chosen({
				'width': '126px'
			});
			$scope.modalDisplayed = false;
			$scope.AddFunctionFailed = false;
			$scope.showForm = true;
			user = UserInfo.getProperty();


			$scope.params = $routeParams;
			if ($routeParams) {
				if ($routeParams.q) {
					$scope.query = {
						q: $routeParams.q
					};
				}
			}

			$scope.fetchSnippetsCollection();
		};


		$scope.hideSnippet = function(snippet, $event) {
			$event.preventDefault();
			$event.stopPropagation();
			if (snippet.expandCode) {
				snippet.expandCode = false;
			}
		};
		$scope.saveSnippet = function(snippet) {
			var editor = ace.edit('editor_' + snippet._id);
			snippet.code = editor.getSession().getValue();
			updateSnippet({
				code: snippet.code,
				id: snippet._id
			});

		};

		$scope.expandSnippet = function(snippet) {
			if (!snippet.expandCode) {
				snippet.expandCode = true;
				var editor = ace.edit('editor_' + snippet._id);
				editor.setTheme('ace/theme/textmate');
				editor.getSession().setMode('ace/mode/javascript');
				editor.getSession().setValue(snippet.code);
				editor.setReadOnly(false);
			}
		};

		$scope.fetchSnippetsCollection = function() {
			CodeSnippet.query($scope.query, function(snips) {
				$scope.snippetsCollection = snips;
			});
		};

		var updateSnippet = function(snippet) {
			$http({
				method: 'POST',
				url: '/updateSnippet',
				data: snippet
			}).success(function(data, status) {
				$scope.homeCtrlVar.message = "Snippet successfully saved!"
			}).error(function(data, status) {
				$scope.homeCtrlVar.message = "Failed change snippet - Try again!"
			});
			userFeedback();

		};

		var userFeedback = function() {
			$scope.homeCtrlVar.editSave = true;
			timeOut = $timeout(function() {
				$scope.homeCtrlVar.editSave = false;
			}, 3000);

		};
	});