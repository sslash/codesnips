var snippetController   = require('../app/controllers/snippetController');
var userController		= require('../app/controllers/userController');

module.exports = function(app, passport){

	// controllers
	app.get('/snippets', snippetController.index);
	app.get('/snippets/:id', snippetController.getById);
	app.post('/snippets/', snippetController.create);
};