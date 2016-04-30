// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    state: { refreshModel: true }
  },

  model(params) {
    return new Ember.RSVP.Promise((resolve) => {
      this.store.findAll('todo').then((todos) => resolve({
        all: todos,
        filter: params.state
      })).catch((err) => {
        console.log("err:",err);
        resolve();
      });
    });
  }
});
