module.exports.service = function(store) {
  return {
    'readTodos': function() {
      return store.getAll();
    },
    'createTodo': function(todo) {
      return store.save(todo);
    },
    'updateTodo': function(todo) {
      return store.update(todo.id, todo);
    },
    'deleteTodo': function(todo) {
      return !!store.delete(todo.id)
    }
  };
};
