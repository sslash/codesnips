var async = require('async');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

var snippetsAuth = [auth.requiresLogin, auth.snippet.hasAuthorization]


var snippetController = require('../app/controllers/snippetController');
var userController = require('../app/controllers/userController');



module.exports = function(app, passport) {
	'use strict'

	// controllers
	app.get('/', userController.index);
	app.get('/snippets/:id', auth.requiresLogin, snippetController.byUser);
	app.get('/snippets', snippetController.index);
	app.post('/snippets', auth.requiresLogin, snippetController.create);
	app.post('/users/', userController.register);

	app.get('/login', userController.login);
	app.get('/signup', userController.signup);
	app.get('/logout', auth.requiresLogin, userController.logout);
	app.post('/users', userController.register);
	app.post('/users/recoverPassword', userController.recoverPassword);
	app.post('/users/getUserByHash', userController.getUserByHash);
	app.post('/users/setNewPassword', userController.newPassword);
	app.post('/users/updateProfile', auth.requiresLogin, userController.updateProfile);
	app.post('/users/session',
		passport.authenticate('local', {
			//failureRedirect: '/login',
			//failureFlash: 'Invalid email or password.'
		}), userController.session);

	app.get('/users/:userId', userController.show);

	app.param('userId', userController.user);
};