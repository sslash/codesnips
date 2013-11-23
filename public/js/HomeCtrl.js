'use strict';

angular.module('codesnipzApp')
.controller('HomeCtrl', function ($scope, $http) {

	$scope.title = '';
	$scope.description = '';
	$scope.stackOverflowUrl = '';
	$scope.codeSnippet = '';
	$scope.codeEditorClicked = false;
	$scope.tagsArray = ['#test','#test2k'];


	$scope.init = function() {
		$('#categorySelect').chosen({'width':'126px'});
		$scope.codeEditorClicked = false;
	};

	$scope.addClicked = function(){
		$('#main-overlay').show();
		$('#addCodesnip').animate({ "top": "+=600px" }, "fast");
	};	

	$scope.closeOnClick = function () {
		$('#addCodesnip').animate({ "top": "-=600px" }, "fast");
		$('#main-overlay').hide();
		if($scope.codeEditorClicked) {
			$scope.codeEditorClicked = false;
			$scope.codeSnippet = '';
		}
	};

	$scope.tagKeyUp = function($event) {
		if ( $event.keyCode === 13 ) {
			$scope.tagsArray.push("#"+$scope.tagText)
			$scope.tagText = "";
		}
	};

	$scope.tagClick = function($event, index){
		$scope.tagsArray.splice(index, 1);
	};

	$scope.codeEditorOnClick = function($event) {
		$($event.currentTarget).css('background-color', 'white');
		$scope.codeEditorClicked = true;
	};

	$scope.AddFormUp = function($event) {
		if ( $event.keyCode === 27 ) {
			if ( $('#addCodesnip').position().top === 60) {
				$scope.closeOnClick();
			}
		}
	};

	$scope.createCodeSnippet = function() {
		var snippet = {
			title : $scope.title,
			description : $scope.description,
			category : $('#categorySelect').val(),
			stackOverflowUrl : $scope.stackOverflowUrl,
			code : $scope.codeSnippet,
			tags : $scope.tagsArray
		};
		$http({
			method: 'POST',
			url: '/snippets/',
			data: snippet,
		}).success(function(data, status){
			console.log("success: " + JSON.stringify(data));
		}).error(function(data, status) {
			console.log("error : " + data);
		});
	}
});


