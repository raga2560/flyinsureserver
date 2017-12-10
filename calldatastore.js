
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
    saveTodo: function(todo, callback) {
        dbtodos.insert(todo, callback);
    },
    updateTodo: function(todo, callback) {
        dbtodos.update({
            id: todo.id
        }, todo, {}, callback);
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
