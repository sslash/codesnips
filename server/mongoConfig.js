var mongoose	= require('mongoose');
var schema		= mongoose.Schema;


exports.connectToMongo = function() {

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/codesnippets';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});



	// if(process.env.VCAP_SERVICES){
	// 	var env = JSON.parse(process.env.VCAP_SERVICES);
	// 	var mongo = env['mongodb-2.0'][0]['credentials'];
	// }
	// else{
	// 	var mongo = {
	// 		"hostname":"localhost",
	// 		"port":27017,
	// 		"username":"",
	// 		"password":"",
	// 		"name":"",
	// 		"db":"codesnippets"
	// 	}
	// }

	// var generate_mongo_url = function(obj){
	// 	obj.hostname = (obj.hostname || 'localhost');
	// 	obj.port = (obj.port || 27017);
	// 	obj.db = (obj.db || 'test');

	// 	if(obj.username && obj.password){
	// 		return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
	// 	}
	// 	else{
	// 		return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
	// 	}
	// }

	// var mongourl = generate_mongo_url(mongo);
	// mongoose.connect(mongourl);
}