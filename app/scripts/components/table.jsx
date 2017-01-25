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
    var todoCollection = this.state.todoCollection;

    todo.destroy();

    this.setState({todoCollection: todoCollection});
  },

  render: function(){
    var self = this;

    var todoCollection = this.state.todoCollection;

    var date = new Date();
    var today = (date.getMonth() + 1) + "/" + date.getDate() + '/' + date.getFullYear();
    var yesterday = (date.getMonth() + 1) + "/" + (date.getDate() - 1)+ '/' + date.getFullYear();
    
    var todoList = todoCollection.map(function(todo){
      return (
        <tr key={todo.get('objectId')} className="todo-row">
          <td className="todo"><p>{todo.get('todoItem')}</p></td>
          <td className="start">{todo.get('dateAdded') === today ? `Today at ${todo.get('timeAdded')}`: todo.get('dateAdded') === yesterday ? `Yesterday at ${todo.get('timeAdded')}` :todo.get('dateAdded') + ' at ' + todo.get('timeAdded')}</td>
          <td className="finish">{todo.get('finishBy')}</td>
          {todo.get('status') ? <td className='status'><a onClick={function(){self.handleStatusChange(todo)}} className="waves-effect waves-light btn">Nevermind</a> <a onClick={function(){self.handleDelete(todo)}} className="waves-effect waves-light btn delete"><i className="material-icons">delete</i></a></td> : <td><a onClick={function(){self.handleStatusChange(todo)}} className="waves-effect waves-light btn">Incomplete</a></td>}
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
