// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Snippet = mongoose.model('snippets', new mongoose.Schema({
  title: String,
  code: String,
  tags: [],
  category: String,
  description: String,
  stackOverflowUrl: String,
  timeCreated : Date,
}),'snippets');