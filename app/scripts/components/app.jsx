var React = require('react');

var FormComponent = require('./form.jsx').FormComponent;
var TableComponent = require('./table.jsx').TableComponent;

var TodoCollection = require('../models/todo.js').TodoCollection;
var Todo = require('../models/todo.js').Todo;

var AppComponent = React.createClass({
  getInitialState: function(){
    var todoCollection = new TodoCollection();

    return {
      todoCollection: todoCollection,
    }
  },

  componentWillMount: function(){
    var self = this;
    var todoCollection = this.state.todoCollection;

    todoCollection.fetch().then(function(){
      self.setState({todoCollection: todoCollection});
    })
  },

  addTodo: function(todo){
    var self = this;

    var todoCollection = this.state.todoCollection;

    todoCollection.create(todo);

    todoCollection.fetch().then(function(){
      self.setState({todoCollection: todoCollection});
    });
    // console.log(self.state.todoCollection);
  },

  render: function(){
    return (
      <div className="app">
        <FormComponent addTodo={this.addTodo}></FormComponent>
        <TableComponent todoCollection={this.state.todoCollection}></TableComponent>
      </div>
    )
  }
});

module.exports = {
  AppComponent: AppComponent
}