// https://stackoverflow.com/questions/37559610

var CallDatabase = function ( io, db ) {
 
    var callDB = require('../calldatastore')(db, 'callstore');
    var database = io.of('/calldatabase');
 
    database.on('connection', function(socket) {
 
        socket.on('message', function(got) {
	 console.log(got);

            io.of('/calldatabase').emit('message', 'sent');
        });
        socket.on('getAllTodos', function() {
            dispatchAll(socket);
        });
 
        socket.on('saveTodo', function(todo) {
            callDB.saveTodo(todo, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
                dispatchAll(socket);
            });
        });
 
        socket.on('updateTodo', function(data) {
            callDB.updateTodo(data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
        
        socket.on('deleteTodo', function(data) {
            callDB.deleteTodo(data.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
 
        // On connection send all the database, to save one round trip
        dispatchAll(socket);
    });
 
 
    function dispatchAll(socket) {
        callDB.getAllTodos(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
            io.of('/calldatabase').emit('allTodos', data);
        });
    }
 
    return database;

}




module.exports = CallDatabase;


