'use strict';

angular.module('codesnipzApp')
.directive('modal', function($templateCache, $document, $compile) {
	
	var initAce = function(scope){
		scope.editor = ace.edit('editor');
		scope.editor.setTheme('ace/theme/textmate');
		scope.editor.getSession().setMode('ace/mode/javascript');
	};

	return {
		restrict: 'A',
		templateUrl: '/partials/modal.html',
		link: function postLink(scope, element, attrs) {

			$(element).hide();

			initAce(scope);

			scope.$watch(attrs.when, function(show) {

				$(element).find('.closeBtn').on('click', function(){
					scope.editor.session.setValue();
					$(element).hide();
					$('#main-overlay').hide();
				});

				if(show){
					$(element).show();
					$('#main-overlay').show();
				}
			});
		}
	};
});
