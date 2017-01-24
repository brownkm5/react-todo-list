var Backbone = require('backbone');


var Todo = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
   delete this.attributes.createdAt;
   delete this.attributes.updatedAt;

   return Backbone.Model.prototype.save.apply(this, arguments);
 },
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
