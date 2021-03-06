'use strict';

angular.module('codesnipzApp')
	.controller('HomeCtrl', function($scope, $http, $timeout, $location, $routeParams, UserInfo, CodeSnippet) {
		$scope.indexOfSnippet = null;
		var snipp = null;
		$scope.snippetsCollection = [];
		var timeOut = null;
		$scope.homeCtrlVar = {
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
			snipp = snippet;
			updateSnippet({
				snippet: snippet,
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
		$scope.deleteSnippet = function(snippet, $event, $index) {
			$event.preventDefault();
			$event.stopPropagation();
			removeSnippet({
				snippet: snippet,
				index: $index

			})
			

		}

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
				$scope.homeCtrlVar.message = data.err;
			});
			snipp.editSave = true;
			userFeedback();

		};
		var removeSnippet = function(snippet) {
			$http({
				method: 'POST',
				url: '/deleteSnippet',
				data: snippet
			}).success(function(data, status) {
				$scope.homeCtrlVar.message = "Snippet successfully removed!"
				$scope.snippetsCollection.splice(snippet.index, 1);
			}).error(function(data, status) {
				$scope.homeCtrlVar.message = data.err;
			});
			

		};

		var userFeedback = function(snippet) {
			$scope.homeCtrlVar.editSave = true;
			timeOut = $timeout(function() {
				snipp.editSave = false;
			}, 3000);

		};
	});