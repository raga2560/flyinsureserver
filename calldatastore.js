
function CallDataStore(db, mycoll) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof CallDataStore)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new CallDataStore(db, mycoll);
    }

    var dbtodos = db.collection(mycoll);



var todos = {
 
    getAllTodos: function(callback) {
         dbtodos.find().toArray(callback);
    },
    listall: function(callback) {
         dbtodos.find().toArray(callback);
    },
    push: function(todo, callback) {
        dbtodos.insert(todo, callback);
		
    },
    saveTodo: function(todo, callback) {
        dbtodos.insert(todo, callback);
    },
    get: function(todo, callback) {
        dbtodos.find({
            _id: todo.id
        },  callback);
    },
    update: function(todo, callback) {
        dbtodos.update({
            _id: todo.id
        }, todo, {}, callback);
    },
    updateTodo: function(todo, callback) {
        dbtodos.update({
            _id: todo.id
        }, todo, {}, callback);
    },
    remove: function(id, callback) {
        dbtodos.remove({
            _id: id
        }, '', callback);
    },
    deleteTodo: function(id, callback) {
        dbtodos.remove({
            id: id
        }, '', callback);
    }
}
 return todos;
}
 
module.exports = CallDataStore;
