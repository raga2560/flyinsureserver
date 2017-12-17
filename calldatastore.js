var mongo = require('mongodb');


function CallDataStore(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof CallDataStore)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new CallDataStore(db);
    }

    //var dbtodos = db.collection(mycoll);



var todos = {
 
    listall: function(recname,query, callback) {
		var dbtodos1 = db.collection(recname);
         dbtodos1.find(query).toArray(callback);
    },
    push: function(recname, todo, callback) {
		var dbtodos1 = db.collection(recname);
        dbtodos1.insert(todo, callback);
		
    },
    get: function(recname, id, callback) {
		console.log('in get call'+id +'  '+recname);
		var o_id = new mongo.ObjectID(id);
		
		var dbtodos1 = db.collection(recname);
        dbtodos1.findOne({
            _id: o_id,
        },  callback);
    },
    update: function(recname, id, data, callback) {
		var dbtodos1 = db.collection(recname);
		var o_id = new mongo.ObjectID(id);
        dbtodos1.update({
            _id: o_id
        }, data, {}, callback);
    },
    remove: function(recname, id, callback) {
		var dbtodos1 = db.collection(recname);
		var o_id = new mongo.ObjectID(id);
        dbtodos1.remove({
            _id: o_id
        }, '', callback);
    },
	removeall: function(recname, callback) {
		var dbtodos1 = db.collection(recname);
        dbtodos1.remove({
            
        }, '', callback);
    }
}
 return todos;
}
 
module.exports = CallDataStore;
