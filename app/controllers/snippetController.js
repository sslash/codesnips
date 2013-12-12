var mongoose = require('mongoose'),
  Snippet = mongoose.model('snippets');


/*
* Searching for snippets
*
* TODO: add support for searching for tags,
* desription, codesnip, user 
*
*/
exports.index = function(req, res) {
  var query = {};

  if (req.query.q){
      query.title = new RegExp(req.query.q, 'ig');
  };

  Snippet.find(query, function(err, snippets){

    if(err) { throw new Error(err) };

    res.send(snippets);
  });
};

exports.getById = function(req, res) {

    Snippet.findById(req.params.id,
		function (err, snippet) {
			if (err) throw new Error(err);
			else
				res.send(snippet.toJSON());
        });
};

exports.create = function(req, res) {
    var snippet = new Snippet(req.body);
    snippet.timeCreated = new Date();


    snippet.save(function(err, doc){
        if (err){
			throw new Error(err);
        } else {
           res.send(doc);
        }
    });
};