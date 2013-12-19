'use strict';

angular.module('codesnipzApp')
    .controller('LibraryCtrl', function($scope, $http, $routeParams, $location, CodeSnippet) {
        $scope.snippetsCollection = [];
        $scope.snippetUser = [];
        $scope.test = [];
        $scope.libraryBoolean = {
            showMenu: false,
            showSort: false
        };

        $scope.searchField = '';

        $scope.init = function() {
            
            $scope.params = $routeParams;
            if ( $routeParams && $routeParams.q ){
                $scope.searchField = $routeParams.q;
            }
            $scope.fetchSnippetsCollection();
        };

        $scope.searchFieldKeyUp = function($event){
            if($event.keyCode === 13){
                 $location.path('/library').search( {'q' : $scope.searchField});
            }
        };

        $scope.fetchSnippetsCollection = function() {
            var query = {};

            if ( $scope.searchField && $scope.searchField.length > 0){
                query.q = $scope.searchField;
            }

            CodeSnippet.query(query, function(snips){
                $scope.snippetsCollection = snips;
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
