// https://stackoverflow.com/questions/37559610

var CallDatabase = function ( io, db ) {
 
    var callDB = require('../calldatastore')(db);
    var database = io.of('/calldatabase');
 
    database.on('connection', function(socket) {
 
	    socket.on('listall', function(listdata) {
			var recname = listdata.recordname;
			
           callDB.listall(recname,listdata.query, function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
            io.of('/calldatabase').emit('listall', data);
           })
        });
 
        socket.on('push', function(pushdata) {
			var recname = pushdata.recordname;
			
            callDB.push(recname, pushdata.data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
				io.of('/calldatabase').emit('returndata', data);
            });
         });
      
		socket.on('get', function(getdata) {
			var recname = getdata.recordname;
            callDB.get(recname,getdata.id, function(err, data) {
				console.log('in get call' + data);
                if (err) throw err; // You can emit the error to a socket 
                io.of('/calldatabase').emit('gotdata', data);
            });
        });
        

		
        socket.on('update', function(updatedata) {
			var recname = updatedata.recordname;
            callDB.updateTodo(recname,updatedata.id, updatedata.data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/calldatabase').emit('returndata', data);
            });
        });
        
		
		socket.on('remove', function(datatoremove) {
			var recname = datatoremove.recordname;
            callDB.remove(recname, datatoremove.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/calldatabase').emit('returndata', data);
            });
        });
		
		socket.on('removeall', function(datatoremove) {
			var recname = datatoremove.recordname;
            callDB.removeall(recname,  function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
				
                io.of('/calldatabase').emit('returndata', data);
            });
        });
 
		
 
    
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


