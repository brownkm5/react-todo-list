var React = require('react');

var TodoCollection = require('../models/todo.js').TodoCollection;

var TableComponent = React.createClass({
  getInitialState: function(){
    var todoCollection = this.props.todoCollection;

    return {
      todoCollection: todoCollection,

    }
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({todoCollection: nextProps.todoCollection});
  },

  // componentWillMount: function(){
  //   var self = this;
  //   var todoCollection = this.state.todoCollection;
  //
  //   todoCollection.fetch().then(function(){
  //     self.setState({todoCollection: todoCollection});
  //   })
  // },

  handleStatusChange: function(todo){
    var todoCollection = this.state.todoCollection;

    //updates background color of status button
    todo.set({status: !todo.get('status')});
    todo.save();
    this.setState({todoCollection: todoCollection});
  },

  handleDelete: function(todo){
    console.log(todo);
  },

  render: function(){
    var self = this;

    var todoCollection = this.state.todoCollection;
    // console.log(todoCollection.models);
    var todoList = todoCollection.map(function(todo){
      // console.log(todo.get('todoItem'));
      return (
        <tr key={todo.get('objectId')} className="todo-row">
          <td className="todo">{todo.get('todoItem')}</td>
          <td className="start">{todo.get('dateAdded')}</td>
          <td className="finish">{todo.get('finishBy')}</td>
          {todo.get('status') ? <td><a onClick={function(){self.handleDelete(todo)}} className="waves-effect waves-light btn">Delete</a></td> : <td className="status"><a onClick={function(){self.handleStatusChange(todo)}} id={todo.get('status')} className="waves-effect waves-light btn">Incomplete</a></td>}
        </tr>
      )
    });

    return (
      <table id='todo-table' className="striped">
        <thead>
          <tr>
              <th data-field="todo">To Do</th>
              <th data-field="start">Date Added</th>
              <th data-field="finish">Finish By</th>
              <th data-field="status">Status</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {todoList}
        </tbody>

      </table>
    )
  }
});

module.exports = {
  TableComponent: TableComponent
}
