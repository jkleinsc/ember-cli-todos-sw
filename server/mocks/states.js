var express = require('express');
function createRouter(statusToUse) {
  var statusRouter = express.Router();

  statusRouter.get('/', function(req, res) {
    res.send({
      'states': [{
        id: 1,
        status: statusToUse
      }]
    });
  });

  statusRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  statusRouter.get('/:id', function(req, res) {
    res.send({
      'status': {
        id: req.params.id,
        status: statusToUse
      }
    });
  });

  statusRouter.put('/:id', function(req, res) {
    res.send({
      'status': {
        id: req.params.id
      }
    });
  });

  statusRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });
  return statusRouter;
}

module.exports = function(app) {
  app.use('/api/states', createRouter('online'));
  app.use('/api/offlineStates', createRouter('offline'));
};
