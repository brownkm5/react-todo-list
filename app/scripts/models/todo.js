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
  status: function(status){
    this.queryString = '?where={"finished": "' + status + '"}';
    return this;
  },
  url: 'https://kevinbrowntown.herokuapp.com/classes/Todo'
  // url: function(){
  //   var url = 'https://kevinbrowntown.herokuapp.com/classes/Todo' + this.queryString;
  //   this.queryString = '';
  //   return url;
  // }
});

// var FinishedCollection = Backbone.Collection.extend({
//   model: Todo,
//   parse: function(data){
//     return data.results
//   },
// });

module.exports = {
  Todo: Todo,
  TodoCollection: TodoCollection
}
