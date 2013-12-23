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
    $scope.query = null;

    $scope.init = function() {
        $scope.params = $routeParams;
        if ( $routeParams ) {

            if ( $routeParams.q ){
                $scope.query = { q : $routeParams.q };
            } else if ( $routeParams.by ) {
                $scope.query = { by : $routeParams.by };
            }
        }
        $scope.fetchSnippetsCollection();
    };

    $scope.filterYours = function() {
        if (user) {
            $location.path('/library').search( {'by' : user._id});
        }
    };

    $scope.filterAll = function() {
        $location.path('/library').search({});
    };

    $scope.expandSnippet = function(snippet){
        snippet.expandCode = snippet.expandCode ? false : true;
        var editor = ace.edit('editor_' + snippet._id);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');
    };

    $scope.searchFieldKeyUp = function($event){
        if($event.keyCode === 13){
           $location.path('/library').search( {'q' : $scope.searchField});
       }
   };

   $scope.fetchSnippetsCollection = function() {
        var query = {};

        CodeSnippet.query($scope.query, function(snips){
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
