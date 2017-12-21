var express = require('express')
  , app = express() // Web framework to handle routing requests
  , bodyParser = require('body-parser')
  , server = require('http').createServer(app)
  , io = require('socket.io')(server)
  
  , session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
  , sharedsession = require("express-socket.io-session")
  , processingserver = require('./processingserver')
  , multer = require('multer')
  , routes = require('./routes')
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB


  

// Attach session
app.use(session);

// Share session with io sockets

io.use(sharedsession(session));

io.on("connection", function(socket) {
    // Accept a login event with user's data
    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
    });
    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
    });       
  
});

 
 app.use(bodyParser());
 app.use('/images',express.static(__dirname + '/images'));
 app.use('/public',express.static(__dirname + '/public'));
 app.use('/angularjsapp',express.static(__dirname + '/angularjsapp'));
 
 
 app.use(function(req, res, next) {
	 var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8100', 'http://localhost:8100'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  return next();
  
	 
    
});
// https://stackoverflow.com/questions/35014487/how-do-you-pass-a-socket-object-to-a-route





MongoClient.connect('mongodb://localhost:27017/demoapp', function(err, db) {
    "use strict";
    if(err) throw err;

console.log ("test1"); 
	
var todos =  require('./receivingfunctions/calldatabase')(io, db);

	routes(app, db, io, multer);
    // Application routes
	
    server.listen(8081, function (){
	

	
  
    console.log('Express server listening on port 8081');
});

});



