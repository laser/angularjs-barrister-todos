/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc')
  .factory('TodoResource', function ($resource) {
    'use strict';

    return $resource('todos/:todoId', {
      todoId: '@id'
    }, {
      update: {
        method: 'PUT',
        query: {
          method: 'GET',
          params: {
            todoId: 'todos'
          },
          isArray: true
        }
      }
    });
  });
