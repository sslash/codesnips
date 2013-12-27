'use strict';

angular.module('codesnipzApp')
.controller('NavCtrl', function ($scope, CodeSnippet, $location) {

    var initModal = function() {
        $scope.showPopup = false;
        $scope.modalForm = true;
        $scope.modal = {
            title : '',
            description : '',
            language : '',
            tags : [],
            category : '',

            // Form submit results
            form : {
                result : '',
                resultMsg : '',
            }
        };

        $('.result-icon').html('');
    };

    $scope.init = function() {
        initModal();
    };

    $scope.closeClicked = function() {
        initModal();
    };

    $scope.searchFieldKeyUp = function($event){
        if($event.keyCode === 13){
            $location.path('/library').search( {'q' : $scope.searchField});
        }
    };

    $scope.submitClicked = function() {

        var snippet = new CodeSnippet({
            title       : $scope.modal.title,
            description : $scope.modal.description,
            language    : $scope.modal.language,
            tags        : $scope.modal.tags,
            category    : $scope.modal.category,
            code        : $scope.editor.getValue()
        })
        .$save()
        .then(function(snippet){
            createFormResultMsg({
                result   : 'Success!',
                msg      : 'Snippet with title ' + snippet.title + '" was created!',
                iconHtml : '<i class="fa fa-thumbs-up fa-5x"></i>'
            });
        }, function(error){
            createFormResultMsg({
                result   : 'Error!',
                msg      : 'Failed to create Codesnippet',
                iconHtml : '<i class="fa fa-thumbs-down fa-5x"></i>'
            });
        });
    };

    $scope.languageBlurred = function($event) {
        var lang = $event.target.value;
        var mode = 'ace/mode/' + lang;
        $scope.editor.getSession().setMode(mode);
        $scope.modal.language = lang;
    };

    $scope.tagsPressed = function(e) {
        if( e.keyCode !== 13 && e.keyCode !== 8) {
            return true;
        }

        var $currTarget = $(e.currentTarget);
        var $searchContent = $currTarget.siblings('.tag-content');

        // Backspace
        if ( e.keyCode === 8 ) {
            $searchContent.children().last().remove();
            $scope.modal.tags.pop();
        } else {
            var tagTxt = $currTarget.val();
            $currTarget.val('');
            var tagHtml = '<span class="tags">'+tagTxt+'</span>';
            $searchContent.append(tagHtml);
            $scope.modal.tags.push(tagTxt);
        }

        var searchWidth = $searchContent.width() + 12;
        $(e.currentTarget).css('padding-left',searchWidth);
    }

    function createFormResultMsg (data) {
        $scope.modal.form.result = data.result;
        $scope.modal.form.resultMsg = data.msg;
        $('.result-icon').append(data.iconHtml);
        $scope.modalForm = false;

        setTimeout(function(){
            $('.closeBtn').trigger('click');
        }, 3000);
    }
});