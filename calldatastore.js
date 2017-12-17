var mongo = require('mongodb');


function CallDataStore(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof CallDataStore)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new CallDataStore(db);
    }

    



var dbfuncpointers = {
 
    listall: function(recname,query, callback) {
		var dbref = db.collection(recname);
         dbref.find(query).toArray(callback);
    },
    push: function(recname, todo, callback) {
		var dbref = db.collection(recname);
        dbref.insert(todo, callback);
		
    },
    get: function(recname, id, callback) {
		console.log('in get call'+id +'  '+recname);
		var o_id = new mongo.ObjectID(id);
		
		var dbref = db.collection(recname);
        dbref.findOne({
            _id: o_id,
        },  callback);
    },
    update: function(recname, id, data, callback) {
		var dbref = db.collection(recname);
		var o_id = new mongo.ObjectID(id);
        dbref.update({
            _id: o_id
        }, data, {}, callback);
    },
    remove: function(recname, id, callback) {
		var dbref = db.collection(recname);
		var o_id = new mongo.ObjectID(id);
        dbref.remove({
            _id: o_id
        }, '', callback);
    },
	removeall: function(recname, callback) {
		var dbref = db.collection(recname);
        dbref.remove({
            
        }, '', callback);
    }
}
 return dbfuncpointers;
}
 
module.exports = CallDataStore;
