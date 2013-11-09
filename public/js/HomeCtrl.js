'use strict';
// Declare app level module which depends on filters, and services
var appControllers = angular.module('myApp.controllers', []);

appControllers.controller('HomeCtrl', function($scope) {
	$scope.codeEditorClicked;
	$scope.tagsArray = ['#test','#test2k'];
	$scope.init = function() {
		$('#categorySelect').chosen({"width":"126px"});
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
			$('#codeEditor').append('<h2>&#60;Code&#62;</h2>')
                        $scope.codeEditorClicked = false;

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
	}

	$scope.codeEditorOnClick = function($event) {
		$($event.currentTarget).find('h2').remove();
		$($event.currentTarget).css('background-color', 'white');
		$scope.codeEditorClicked = true;
	};
        $scope.AddFormUp = function($event) {
            if ( $event.keyCode === 27 ) {
                if ( $('#addCodesnip').position().top === 60) {
                $scope.closeOnClick();
                }
            }


        }

     $scope.createCodeSnip = function() {
     	console.log("FETT");
     	$http({
			method: 'POST',
			url: REST_API_URL + '/management/team/add',
			data: "Data",
		}).success(function(data, status){
			console.log("success");
		}).error(function(data, status) {
			console.log("error : createTeamWithPlayers");
			console.log(data);
		});
	}



});


