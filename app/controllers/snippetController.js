'use strict'
var mongoose = require('mongoose'),
  Snippet = mongoose.model('snippets'),
  User = mongoose.model('User');


/*
 * Searching for snippets
 *
 * TODO: add support for searching for tags,
 * desription, codesnip, user
 *
 */
exports.index = function(req, res) {
  var query = {};
  if (req.query.q) {
    query.title = new RegExp(req.query.q, 'ig');
  }

  Snippet
    .find(query)
    .populate('owner')
    .exec(function(err, snippets) {
      if (err) {
        res.send(err);
      } else {
        return res.send(snippets);
      }
    });
};

exports.byUser = function(req, res) {
  var query = {};
  query.owner = req.params.id;
  Snippet
    .find(query)
    .populate('owner')
    .exec(function(err, snippets) {
      if (err) {
        res.send(err);
      } else {
        return res.send(snippets);
      }
    });
}

exports.getById = function(req, res) {
  Snippet.findById(req.params.id,
    function(err, snippet) {
      if (err) {
        throw new Error(err);
      } else
        res.send(snippet.toJSON());
    });
};

exports.create = function(req, res) {
  var userId = req.session.passport.user;
  var u = findUser(userId, function(user) {
    var snipData = req.body;
    snipData.owner = user;
    snipData.timeCreated = new Date();
    var snippet = new Snippet(snipData);
    snippet.save(function(err, doc) {
      if (err) {
        throw new Error(err);
      } else {
        res.send(doc);
      }
    });
  });

};

exports.edit = function(req, res) {
  Snippet.findById(req.body.id,
    function(err, snippet) {
      if (err) {
        throw new Error(err);
      } else {
        if (req.body.snippet.owner._id.localeCompare(snippet.owner) ===0) {
          snippet.code = req.body.snippet.code;
          snippet.save();
          res.send(snippet.toJSON());
        } else {
          res.send({
            'err': "You don't own this snippet"
          }, 401);
        }
      }

    });
};

exports.deleteSnippet = function(req, res) {
  Snippet.findById(req.body.snippet._id,
    function(err, snippet) {
      if (err) {
        throw new Error(err);
      } else { 
        if (req.body.snippet.owner._id.localeCompare(snippet.owner) ===0) {
          snippet.remove();
          res.send(snippet.toJSON());
        } else {
          res.send({
            'err': "You don't own this snippet"
          }, 401);
        }
      }

    });
};



var findUser = function(id, next) {
  User.findById(id,
    function(err, user) {
      if (err) throw new Error(err);
      else {
        next(user);
      }
    });
}