module.exports = function(app, server) {
  app.post('/todos', function(req, res) {
    server.handle({}, req.body, function(respJson) {
      res.contentType('application/json');
      res.send(respJson);
    });
  });
};
