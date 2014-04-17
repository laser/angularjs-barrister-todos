module.exports.service = function(store) {
  return {
    'readTodos': function(callback) {
      callback(null, store.getAll());
    },
    'createTodo': function(todo, callback) {
      callback(null, store.save(todo));
    },
    'updateTodo': function(todo, callback) {
      callback(null, store.update(todo.id, todo));
    },
    'deleteTodo': function(todo, callback) {
      callback(null, !!store.delete(todo.id));
    }
  };
};
