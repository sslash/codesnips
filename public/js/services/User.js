'use strict';

angular.module('codesnipzApp')
	.factory('User', function($resource) {
		return $resource('/users/', {});
	});

angular.module('codesnipzApp')
  .factory('LogOff', function ($resource) {
    return $resource('/logout/',{});
  });
