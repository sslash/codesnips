'use strict';

angular.module('codesnipzApp')
  .controller('LibraryCtrl', function ($scope, $http) {

    $scope.snippetsCollection = [];
    $scope.menuBoolean = {showMenu:false}
    $scope.init = function() {
        console.log ("init");
        $scope.fetchSnippetsCollection();
    };

    $scope.fetchSnippetsCollection = function(){
        $http({
            method : 'GET',
            url : '/snippets/',
        }).success(function(data,status){
                $scope.snippetsCollection = data;
        });
    };

    $scope.menu = function() {
        $scope.menuBoolean.showMenu = !$scope.menuBoolean.showMenu;
    };
});

