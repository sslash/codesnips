'use strict';

angular.module('codesnipzApp')
  .factory('User', function ($resource) {
    return $resource('/users/',{ });
  });
