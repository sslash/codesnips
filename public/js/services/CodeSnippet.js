'use strict';

angular.module('codesnipzApp')
	.factory('CodeSnippet', function($resource) {
		return $resource('/snippets/', {
		});
	});