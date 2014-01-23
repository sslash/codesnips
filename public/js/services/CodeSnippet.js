'use strict';

angular.module('codesnipzApp')
	.factory('CodeSnippet', function($resource) {

		var CodeSnippet = $resource('/snippets/:userId', {});

		CodeSnippet.getTags = function (snips) {
			var tags = [];
			snips.forEach(function(s) {
				s.tags.forEach(function(t) {
					if ( tags.indexOf(t) === -1 ) {
						tags.push(t);
					}
				});
			});

			return tags;
		};

		CodeSnippet.filterByTag = function (snips, tagName) {
			var filtered = [];
			snips.forEach(function(s) {
				s.tags.forEach(function(t) {
					if ( t.indexOf(tagName) !== -1 ) {
						filtered.push(s);
						return true;
					}
				});
			});

			return filtered;
		};

		return CodeSnippet;

	});