/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute'])
.config(function ($routeProvider) {
  'use strict';

  $routeProvider.when('/', {
    controller: 'TodoCtrl',
    resolve: {
      'RPCData': function(RPC) {
        return RPC.promise;
      }
    },
    templateUrl: 'todomvc-index.html'
  }).when('/:status', {
    controller: 'TodoCtrl',
    resolve: {
      'RPCData': function(RPC) {
        return RPC.promise;
      }
    },
    templateUrl: 'todomvc-index.html'
  }).otherwise({
    redirectTo: '/'
  });
});
