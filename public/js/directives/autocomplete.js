'use strict';

angular.module('codesnipzApp')
  .directive('autocomplete', function () {



    return {
      templateUrl: '/partials/autocomplete.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.autocomplete.keys = [];
      	var $ul = element.find('ul');
      	var keys = element.attr('data-keys').split(',');

      	var $input = element.find('input');
      	var $ul = element.find('ul');

      	$ul.on('click', function(e) {
      		var lang = e.target.textContent;
			var mode = 'ace/mode/' + lang;
	        scope.editor.getSession().setMode(mode);
	        scope.modal.language = lang;
	        $($ul).show();
      		$($ul).empty();
      		$input.val(lang);
      	});

      	element.find('input').on('keyup', function(e) {
      		console.log('sap ' + e.keyCode);

      		var currVal = e.currentTarget.value;
      		$($ul).show();
      		$($ul).empty();
      		keys.forEach(function(key){
  				if ( key.match('^' + currVal)) {
  					scope.autocomplete.keys.push(key);
  					$ul.append('<li>' + key + '</li>');
  				}
      		});
      	});
      }
    };
  });
