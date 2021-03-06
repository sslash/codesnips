'use strict';

angular.module('codesnipzApp')
.controller('NavCtrl', function ($scope, CodeSnippet, $location, UserInfo, $timeout) {
    var timeOut;

    var initModal = function() {
        $scope.showPopup = false;
        $scope.autocomplete = {
            keys : []
        };
        $scope.modalForm = true;
        $scope.modal = {
            title : '',
            link : '',
            description : '',
            language : '',
            tags : [],
            showErrorMessage: false,
            errorMsg : '',

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
        $timeout.cancel(timeOut);
    };

    $scope.searchFieldKeyUp = function($event){
        if($event.keyCode === 13){
            $location.path('/home').search( {'q' : $scope.searchField});
        }
    };

    $scope.submitClicked = function() {
        var user = UserInfo.getProperty();
        if ( !user.hasOwnProperty('_id') ) {
            $scope.modal.errorMsg = 'Please login in order to add a snippet';
            $scope.modal.showErrorMessage = true;
            return false;
        }

        var snippet = new CodeSnippet({
            title       : $scope.modal.title,
            description : $scope.modal.description,
            language    : $scope.modal.language,
            tags        : $scope.modal.tags,
            link        : $scope.modal.link,
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

    $scope.removeTag = function(index){
        $scope.modal.tags.splice(index, 1);
    }

    $scope.tagsPressed = function(e) {
        if( e.keyCode !== 13 && e.keyCode !== 8) {
            return true;
        }

        var $currTarget = $(e.currentTarget);
        $scope.modal.tags.push($currTarget.val());
        $currTarget.val('');
    }

    function createFormResultMsg (data) {
        $scope.modal.form.result = data.result;
        $scope.modal.form.resultMsg = data.msg;
        $('.result-icon').append(data.iconHtml);
        $scope.modalForm = false;

        timeOut = $timeout(function() {
            $('.closeBtn').trigger('click');
        }, 3000);
    }
});
