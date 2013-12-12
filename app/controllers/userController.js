var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../../lib/utils');

exports.index = function(req, res){
	
	if ( req.session.passport ){
		var userId = req.session.passport.user;

		User.findById(userId, function(err, user) {
		      if (err) {
		      	throw new Error(err);
		      }else {
		        res.render('index', {user : user});
		      }
	    });
	}else{
		res.render('index', {user : {}});
	}
};

exports.register = function(req, res) {
	console.log("register: " + JSON.stringify(req.body));
	var user = new User(req.body)
	console.log(user);
	user.authToken = createSessionId();
	user.provider = 'local'
	user.save(function(err) {
		if (err) {
			console.log("ERROR: " + JSON.stringify(err) + "::" + utils.errors(err.errors));
			return res.send(utils.errors(err.errors));
		} else {
			console.log(user);
			res.send(user);
		}
	});
};

var login = function(req, res) {
	// if (req.session.returnTo) {

	//   res.send(req.session.returnTo)
	//   console.log("delete and return");
	//   delete req.session.returnTo
	//   return;
	//
	res.cookie('sessionID', req.user.authToken, {httpOnly:false});
	res.send(req.user);
	


}
var createSessionId = function() {
	return Math.floor((Math.random() * 999) + 1);
	
};


exports.temp = function(req, res) {
	
	User.find({'username':req.user.username},
		function(err, u){

    if(err) {
    	throw new Error(err); 
    	console.log("ERR: " + err);
    }else{
    	if(req.params.id === req.user.authToken){
    		return res.send(req.user.authToken);
    	}else {
    		console.log("error");
    		return res.send (401, err);
    	}
    } 

  });
}

exports.login = function(req, res) {

}

exports.logout = function(req, res) {

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