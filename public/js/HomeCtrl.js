'use strict';

angular.module('codesnipzApp')
.controller('HomeCtrl', function($scope, $http, $timeout, $location, $routeParams, UserInfo, CodeSnippet) {

	$scope.snippetsCollection = [];

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
                $scope.query = { q: $routeParams.q };
            }
        }

		$scope.fetchSnippetsCollection();
	};

	$scope.hideSnippet = function(snippet, $event) {
		$event.preventDefault();
		$event.stopPropagation();
		if ( snippet.expandCode ) {
			snippet.expandCode = false;
		}
	};

	$scope.expandSnippet = function(snippet) {
		console.log(snippet.expandCode);
		if ( !snippet.expandCode ) {
			snippet.expandCode = true;
			var editor = ace.edit('editor_' + snippet._id);
			editor.setTheme('ace/theme/textmate');
			editor.getSession().setMode('ace/mode/javascript');
			editor.getSession().setValue(snippet.code);
			editor.setReadOnly(true);
		}
	};

	$scope.fetchSnippetsCollection = function() {
		CodeSnippet.query($scope.query, function(snips){
			$scope.snippetsCollection = snips;
		});
	};
});
