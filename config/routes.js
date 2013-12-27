var async = require('async');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

var snippetsAuth = [auth.requiresLogin, auth.snippet.hasAuthorization]


var snippetController = require('../app/controllers/snippetController');
var userController = require('../app/controllers/userController');



module.exports = function(app, passport) {

	// controllers
	app.get('/', userController.index);
	app.get('/snippets', auth.requiresLogin, snippetController.index);
	app.get('/snippets/:id', snippetController.getById);
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
		}), userController.session)
	app.get('/users/:userId', userController.show)
	app.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: ['email', 'user_about_me'],
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/github',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/github/callback',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/twitter',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/google',
		passport.authenticate('google', {
			failureRedirect: '/login',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
			]
		}), userController.signin)
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/linkedin',
		passport.authenticate('linkedin', {
			failureRedirect: '/login',
			scope: [
				'r_emailaddress'
			]
		}), userController.signin)
	app.get('/auth/linkedin/callback',
		passport.authenticate('linkedin', {
			failureRedirect: '/login'
		}), userController.authCallback)

	app.param('userId', userController.user)
};