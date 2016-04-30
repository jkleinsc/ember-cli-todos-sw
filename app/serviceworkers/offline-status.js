toolbox.router.get('/api/states', function(request, values, options) {
  return new Promise((resolve) => {
    toolbox.networkOnly(request, values, options).then(resolve)
    .catch((err) => {
      logDebug('Network first returned no response, calling fallback from cache.',err);
      var offlineState = {
        'states':[{
          'id':1,
          'status':'offline'
        }]
      };
      resolve(new Response(JSON.stringify(offlineState),{
        headers: { "Content-Type" : "application/json" }
      }));
    });
  });
});

toolbox.router.post('/api/todos', function(request, values, options) {
  return new Promise((resolve) => {
    var todoPost = request.clone();
    toolbox.networkOnly(request, values, options).then((result) => {
      todoPost.json().then(function(json) {
        self.registration.showNotification('Reminder', {
          body: json.todo.title
        });
      });
      resolve(result);
    }).catch(() => {
      self.registration.showNotification('Sorry', {
        body: 'Cannot save offline'
      });
    });
  });
});
