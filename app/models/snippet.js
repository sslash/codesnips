// Example model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Snippet = mongoose.model('snippets', new mongoose.Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'},
	title: String,
	link : String,
	code: String,
	tags: [],
	language : String,
	description: String,
	stackOverflowUrl: String,
	timeCreated: Date,
}), 'snippets');