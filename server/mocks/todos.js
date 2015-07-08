var mockData = [{
    id: '1',
    title: 'Install ember-cli',
    isCompleted: true
}, {
    id: '2',
    title: 'Install additional dependencies',
    isCompleted: true
}, {
    id: '3',
    title: 'Develop amazing things',
    isCompleted: false
}];
module.exports = function(app) {
  var express = require('express');
  var todosRouter = express.Router();

  todosRouter.get('/', function(req, res) {
    res.send({
      'todos': mockData
    });
  });

  todosRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  todosRouter.get('/:id', function(req, res) {
    var records = mockData.filter(function(record) {
      return (record.id === req.params.id);
    });
    res.send({
      'todos': records[0]
    });
  });

  todosRouter.put('/:id', function(req, res) {
    res.send({
      'todos': {
        id: req.params.id
      }
    });
  });

  todosRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/todos', todosRouter);
};

