'use strict';

angular.module('codesnipzApp')
	.factory('User', function($resource) {
		return $resource('/users/', {});
	});


angular.module('codesnipzApp')
    .service('UserInfo', function () {
    var user = {};
        return {
            getProperty: function () {
                return user;
            },
            setProperty: function(u) {
                user = u;
            }
        };
    });