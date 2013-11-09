// DEPENDENCIES
// ======================================
var express = require("express"),
http = require("http"),
port = (process.env.PORT || 8001),
mongoConfig = require('./mongoConfig'),
mongoose = mongoose || require('mongoose'),
schema = mongoose.Schema,
server = module.exports = express();

// SERVER CONFIGURATION
// =======================================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

    server.use(express.errorHandler({

        dumpExceptions:true,

        showStack:true

    }));

    server.use(express.bodyParser());
    server.use(server.router);
});

console.log('Welcome to Codesnips!\n\nPlease go to http://localhost:' + port);

/* Mongoose */
mongoConfig.connectToMongo();

var Snippet = mongoose.model('snippets', new mongoose.Schema({
  title: String,
  code: String,
  tags: [],
  category: String,
  description: String,
  stackOverflowUrl: String,
  timeCreated : Date,
}),'snippets');




// Basic REST API
// ==============
server.get('/', function(req, res) {
  res.send('Hello.');
});

server.get('/snippets/:id', function(req, res) {

    return Snippet.findById(req.params.id, 
        function (err, snippet) {
            if (err) // TODO handle err
              console.log(err);
          else
            res.send(snippet.toJSON());
        });
});

server.get('/snippets/', function(req, res) {

    return Snippet.find(function (err, snippets) {
            if (err) // TODO handle err
              console.log(err);
          else
            res.send(snippets);
        });
});

server.post('/snippets/', function(req, res) {
    var snippet = new Snippet(req.body);
    snippet.timeCreated = new Date();

    snippet.save(function(err, doc){
        if (err){
            console.log(err);
        }else{
           res.send(doc);
        }
    });
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);
