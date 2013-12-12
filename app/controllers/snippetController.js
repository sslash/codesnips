var mongoose = require('mongoose'),
  Snippet = mongoose.model('snippets'),
  User = mongoose.model('User');

exports.index = function(req, res) {
  //debugger;
  var userId = req.session.passport.user;
  
    Snippet
    .find()
    .populate('owner')
    .exec(function(err, snippets) {
      if (err) throw new Error(err);
      console.log(snippets);
      return res.send(snippets);
    });
  };



/*
  var user = findUser(userId), function(user) {
    Snippet.find(function(err, snippets) {
      if (err) throw new Error(err);

      returnObject = {
        username:user.username,
        snippet:snippets
      }
      
      res.send(returnObject);
    });
  });
};
*/
exports.getById = function(req, res) {
  Snippet.findById(req.params.id,
    function(err, snippet) {
      if (err) throw new Error(err);
      else
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

var findUser = function(id, next) {
  User.findById(id,
    function(err, user) {
      if (err) throw new Error(err);
      else {
        next(user);
      }
    });
}

