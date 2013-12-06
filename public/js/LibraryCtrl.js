'use strict';

angular.module('codesnipzApp')
    .controller('LibraryCtrl', function($scope, $http, $cookies) {

        $scope.snippetsCollection = [];
        $scope.libraryBoolean = {
            showMenu: false,
            showSort: false
        }
        $scope.init = function() {               
            $scope.fetchSnippetsCollection();
        };

        $scope.fetchSnippetsCollection = function() {
            $http({
                method: 'GET',
                url: '/snippets',
            }).success(function(data, status) {
                $scope.snippetsCollection = data;
            }).error(function(data, status) {
                console.log("Failed to retrive snippets! " + status);
            });;
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