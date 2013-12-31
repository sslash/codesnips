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

	$scope.expandSnippet = function(snippet){
		snippet.expandCode = snippet.expandCode ? false : true;
		var editor = ace.edit('editor_' + snippet._id);
		editor.setTheme('ace/theme/textmate');
		editor.getSession().setMode('ace/mode/' + snippet.language);
		editor.getSession().setValue('');
		editor.getSession().setValue(snippet.code);
		editor.setReadOnly(true);
	};

	$scope.fetchSnippetsCollection = function() {
		CodeSnippet.query($scope.query, function(snips){
			$scope.snippetsCollection = snips;
		});
	};
});
