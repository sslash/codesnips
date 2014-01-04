'use strict'

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../../lib/utils'),
	nodemailer = require("nodemailer"),
	crypto = require('crypto'),
	Q = require('q');

exports.getUserByHash = function(req, res) {
	User.find({
		'recoverPassword': req.body.hash
	}, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			res.send({}, 200);

		}
	});
}
exports.newPassword = function(req, res) {
	User.findOne({
		'recoverPassword': req.body.hash
	}, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			user.password = req.body.password;
			//user.recoverPassword = "";
			user.save();
			res.send(user.username, 200);

		}
	});
}


exports.index = function(req, res) {
	var userObject;
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
	verifyEmailRegistration(req.body.username, req.body.email, res,function(err, result) {
		if (err) {
			console.log(err);

		} else {
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
		}
	});
}

var verifyUser = function(user, res) {
	var username = user.username.trim();
	User.find({
		'email': user.email
	}, function(err, user) {
		if (user.length < 1) {
			User.find({
				'username': username
			}, function(err, user) {
				if (user.length < 1) {
					console.log("sucess, user can register");
				} else {
					console.log("fail");
				}

			});
		} else {
			console.log("not register");
		}
	});

}

var login = function(req, res) {
	res.send(req.user);



}

exports.temp = function(req, res) {


}

exports.login = function(req, res) {


}
exports.recoverPassword = function(req, res) {
	verifyEmail(req.body.email, res, function(err, result) {
		if (err) {
			res.send('Mail not found', 500);

		} else {
			sendRecoverymail(email, function(err, result) {
				if (err) {
					res.send({}, 500);
				} else {
					res.send({}, 200);

				}
			});
		}
	});

}
exports.logout = function(req, res) {
	var deferred = Q.defer();
	req.session.destroy();
	res.send({}, 200);
}

exports.signup = function(req, res) {

}

exports.show = function(req, res) {

}

exports.updateProfile = function(req, res) {
	var userId = req.session.passport.user;

	User.findById(userId, function(err, user) {
		if (err) {
			throw new Error(err);
		} else {
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.save(function(err) {
				if (err) {
					console.log("ERROR: " + JSON.stringify(err) + "::" + utils.errors(err.errors));
					return res.send(utils.errors(err.errors));
				} else {
					res.send(user);
				}


			});
		}
	});
};


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


var sendRecoverymail = function(user, res) {
	/*should be put in a own local function*/
	var localUrl = "http://localhost:3000/#/newPassword/";
	var url = "http://codesnipz.herokuapp.com//#/newPassword/";

	var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
	var crypted = cipher.update(user.username + Math.random(), 'utf8', 'hex');
	crypted += cipher.final('hex');
	user.recoverPassword = crypted;
	user.save();
	/*												*/


	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "noreplycodesnippets@gmail.com",
			pass: "codesnippets"
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: "Codesnippets <noreply@codesnippets.com>", // sender address
		to: user.email, // list of receivers
		subject: "Reset password for codesnippet", // Subject line
		text: "Hello " + user.username + "\r\n\r\nPlease follow this link: " + url + crypted + " in order to set a new password for codesnippet", // plaintext body
		//html: "<h1> Hello " + user.username + "</h1> <p> Please follow this link: " +crypted+ " in order to set a new password for codesnippet" // html body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}

		smtpTransport.close(); // shut down the connection pool, no more messages
		res.send({}, 200);
	});
}
var verifyEmailRegistration = function(username, email, res) {
	User.findOne({
		'email': email
	}, function(err, user) {
		if (user != null) {
			res.send({
				'err': 'Mail found'
			}, 404);
		} else {
			verifyUserRegistration(username, res);
		}
	});
}
var verifyUserRegistration = function(username, res) {
	User.findOne({
		'username': username
	}, function(err, user) {
		if (user != null) {
			res.send({
				'err': 'Username found'
			}, 404);
		}
	});
}

var verifyEmail = function(email, res) {
	User.findOne({
		'email': email
	}, function(err, user) {
		if (user === null) {
			res.send({
				'err': 'Mail not found'
			}, 404);
		} else {
			sendRecoverymail(user, res);

		}
	});

}