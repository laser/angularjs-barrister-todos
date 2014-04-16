/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, TodoResource) {
  'use strict';

  $scope.todos = TodoResource.query();
  $scope.newTodo = '';
  $scope.editedTodo = null;

  $scope.$watch('todos', function (newValue, oldValue) {
    $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
    $scope.completedCount = $scope.todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
  }, true);

  // Monitor the current route for changes and adjust the filter accordingly.
  $scope.$on('$routeChangeSuccess', function () {
    var status = $scope.status = $routeParams.status || '';

    $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : null;
  });

  $scope.addTodo = function () {
    var newTodoTitle = $scope.newTodo.trim();
    if (!newTodoTitle.length) {
      return;
    }

    var newTodo = new TodoResource({
      title: newTodoTitle,
      completed: false
    });

    newTodo.$save();
    $scope.todos.unshift(newTodo);

    $scope.newTodo = '';
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    $scope.originalTodo = angular.extend({}, todo);
  };

  $scope.doneEditing = function (todo) {
    $scope.editedTodo = null;
    todo.title = todo.title.trim();

    if (!todo.title) {
      $scope.removeTodo(todo);
    }
    else {
      todo.$update();
    }
  };

  $scope.revertEditing = function (todo) {
    $scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
    $scope.doneEditing($scope.originalTodo);
  };

  $scope.removeTodo = function (todo) {
    todo.$remove();
    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

  $scope.toggleCompleted = function (todo) {
    todo.completed = !todo.completed;
    todo.$update();
  };

  $scope.clearCompletedTodos = function () {
    var remainingTodos = [];
    angular.forEach($scope.todos, function (todo) {
      if (todo.completed) {
        todo.$remove();
      } else {
        remainingTodos.push(todo);
      }
    });
    $scope.todos = remainingTodos;
  };

  $scope.markAll = function (completed) {
    $scope.todos.forEach(function (todo) {
      todo.completed = !completed;
      todo.$update();
    });
  };
});
