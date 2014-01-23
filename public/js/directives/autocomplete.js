'use strict';

angular.module('codesnipzApp')
  .directive('autocomplete', function () {

    var currFocus = -1;

    var letterPressed = function (e, $ul, keys, scope) {
      var currVal = e.currentTarget.value;
          $($ul).show();
          $($ul).empty();
          keys.forEach(function(key){
          if ( key.match('^' + currVal)) {
            scope.autocomplete.keys.push(key);
            $ul.append('<li>' + key + '</li>');
          }
      });
    };

    var keyUpDownPressed = function (e, $ul) {
      
      var $list = $ul.children(),$toFocus;

      // go down
      if ( e.keyCode === 40 ) {
        if ( currFocus < $list.length ) {
          currFocus ++;
          $toFocus = $list[currFocus];
        }

        // go up
      } else {
        if (currFocus > 0) {
          currFocus--;
          $toFocus = $list[currFocus];
        }
      }

      $list.removeClass('focus');
      $($toFocus).addClass('focus');

    };

    var enterPressed = function ( e, $ul, scope, $input ) {
      var elem = $ul.children()[currFocus];
      var text = $(elem).text();

      setMode( text, scope, $ul, $input );
    };

    var setMode = function (lang, scope, $ul, $input ) {
      var mode = 'ace/mode/' + lang;
      scope.editor.getSession().setMode(mode);
      scope.modal.language = lang;
      $($ul).hide();
      $($ul).empty();
      $input.val(lang);
      currFocus = -1;
    };

    var escapePressed = function ( $ul ) {
      $($ul).hide();
      $($ul).empty();
      currFocus = -1;
    };

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
      		setMode( e.target.textContent, scope, $ul, $input);
      	});

      	element.find('input').on('keyup', function(e) {

          if ( e.keyCode === 40 || e.keyCode === 38 ) {
            keyUpDownPressed( e, $ul );

          } else if ( e.keyCode === 27 ) {
            escapePressed ($ul);

          } else if ( e.keyCode === 13 ) {

            enterPressed ( e, $ul, scope, $input );

          } else {
            letterPressed( e, $ul, keys, scope );
          }
      	});
      }
    };
  });
