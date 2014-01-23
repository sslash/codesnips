'use strict';

angular.module('codesnipzApp')
    .controller('LibraryCtrl', function($scope, $http, $routeParams, $location, CodeSnippet, UserInfo) {
        $scope.snippetsCollection = [];
        $scope.snippetUser = [];
        $scope.test = [];
        $scope.libraryBoolean = {
            showMenu: false,
            showSort: false,
            login: false,
        };

        $scope.searchField = '';
        $scope.query = {};

        $scope.init = function() {
            $scope.params = $routeParams;
            if ($routeParams) {

                if ($routeParams.q) {
                    $scope.query = {
                        q: $routeParams.q
                    };
                } else if ($routeParams.by) {
                    $scope.query = {
                        by: $routeParams.by
                    };
                }
            }
            $scope.fetchSnippetsCollection();
        };

        $scope.filterAll = function() {
            $location.path('/library').search({});
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
                editor.getSession().setValue('');
                editor.getSession().setValue(snippet.code);
            }
        };

        $scope.searchFieldKeyUp = function($event) {
            if ($event.keyCode === 13) {
                $location.path('/library').search({
                    'q': $scope.searchField
                });
            }
        };

        $scope.fetchSnippetsCollection = function() {
            var user = UserInfo.getProperty();
            if ( !user.hasOwnProperty('_id') ) {return false;}
            
            $scope.query.userId = user._id;

            CodeSnippet.query($scope.query, function(snips) {
                $scope.snippetsCollection = snips;
                $scope.libraryBoolean.login = true;
            
            }, function(error){
                console.log(error.status);
            });
        };

        $scope.menu = function() {
            $scope.libraryBoolean.showMenu = !$scope.libraryBoolean.showMenu;
        };
        $scope.sort = function() {
            $scope.libraryBoolean.showSort = !$scope.libraryBoolean.showSort;
        };
        $scope.closeOnClick = function(index) {
            $scope.snippetsCollection.splice(index, 1);
        };
    });