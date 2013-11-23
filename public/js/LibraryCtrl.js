'use strict';

angular.module('codesnipzApp')
  .controller('LibraryCtrl', function ($scope, $http) {

    $scope.snippetsCollection = [];

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
});

