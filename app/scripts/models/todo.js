var Backbone = require('backbone');


var Todo = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var TodoCollection = Backbone.Collection.extend({
  model: Todo,
  parse: function(data){
    return data.results
  },
  url: 'https://kevinbrowntown.herokuapp.com/classes/Todo'
});

module.exports = {
  Todo: Todo,
  TodoCollection: TodoCollection
}
