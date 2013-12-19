var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../../lib/utils');


exports.index = function(req, res) {
	var userObject;
	console.log(req.profile);
	if (req.session.passport) {
		var userId = req.session.passport.user;
		User.findById(userId, function(err, user) {
			if (err) {
				throw new Error(err);
			} else {
				res.render('index', {
					user: user
				});
			}
		});
	} else {
		res.render('index', {
			user: {}
		});
	}
};
var gravatar = function(user) {
	var gravatar = require('gravatar');
	var url = gravatar.url(user.email, {
		s: '100',
		r: 'pg'
		//d: '404'
	});
	user.gravatar = url;
	user.save();


};

exports.register = function(req, res) {
	var user = new User(req.body)
	user.provider = 'local'
	user.save(function(err) {
		if (err) {
			console.log("ERROR: " + JSON.stringify(err) + "::" + utils.errors(err.errors));
			return res.send(utils.errors(err.errors));
		} else { 
			if (user) {
				gravatar(user);
			}
			res.send(req.user);
		}
	});
};

var login = function(req, res) {
	res.send(req.user);



}



exports.temp = function(req, res) {

	User.find({
			'username': req.user.username
		},
		function(err, u) {

			if (err) {
				throw new Error(err);
				console.log("ERR: " + err);
			} else {
				if (req.params.id === req.user.authToken) {
					return res.send(req.user.authToken);
				} else {
					console.log("error");
					return res.send(401, err);
				}
			}

		});
}

exports.login = function(req, res) {

}

exports.logout = function(req, res) {
	req.session.destroy();
	res.send({}, 200);
}

exports.signup = function(req, res) {

}

exports.show = function(req, res) {

}

/**
 * Session
 */
exports.session = login;

exports.signin = function(req, res) {

}

exports.authCallback = function(req, res) {

}

exports.user = function(req, res) {

}