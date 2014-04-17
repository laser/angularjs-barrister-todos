/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc')
.service('RPC', function ($http) {
  'use strict';

  var i, RPC = {},

  // Barrister endpoint and interface to expose
  endpoint = {
    url: "/todos",
    interfaces: ["TodoService"]
  },

  clientOpts = {
    // automatically convert JS types to conform to IDL types
    // if it can be done w/o data loss (e.g. "1" -> 1, "true" -> true)
    coerce: true
  };

  function initClient(endpoint) {
    var transport, client, promise;

    transport = function(req, callback) {
      $http
        .post(endpoint.url, Barrister.JSON_stringify(req))
        .success(function(data, status, headers, config) {
          callback(Barrister.parseResponse(req, null, data));
        })
        .error(function(data, status, headers, config) {
          callback(Barrister.parseResponse(req, status + " data: " + data, null));
        });
    },

    client = new Barrister.Client(transport, clientOpts);

    promise = client.loadContract();
    promise
      .success(function() {
        var i, name;

        for (i = 0; i < endpoint.interfaces.length; i++) {
          name = endpoint.interfaces[i];
          RPC[name] = client.proxy(name);
        }
      })
      .error(function(err) {
        alert("Unable to load contract: " + Barrister.JSON_stringify(err));
      });

    return promise;
  }

  RPC['promise'] = initClient(endpoint);

  return RPC;
});
