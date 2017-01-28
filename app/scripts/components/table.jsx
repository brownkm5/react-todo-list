var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoCollection = require('../models/todo.js').TodoCollection;

var TableComponent = React.createClass({
  getInitialState: function(){
    var todoCollection = this.props.todoCollection;
    // var finishedCollection = this.props.finishedCollection;

    return {
      todoCollection: todoCollection,
      // finishedCollection: finishedCollection
    }
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({todoCollection: nextProps.todoCollection});
    // this.setState({finishedCollection: nextProps.finishedCollection});
    // console.log(this.state.finishedCollection);
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
    // this.setState({finishedCollection: finishedCollection});
  },

  render: function(){
    var self = this;
    // var finishedCollection = new TodoCollection
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
          {todo.get('status') ? <td className='status hide-on-small-only'><a onClick={function(){self.handleStatusChange(todo)}} className="waves-effect waves-light btn">Finished</a> <a onClick={function(){self.handleDelete(todo)}} className="waves-effect waves-light btn delete"><i className="material-icons">delete</i></a></td> : <td className='hide-on-small-only'><a onClick={function(){self.handleStatusChange(todo)}} className="waves-effect waves-light btn">Incomplete</a></td>}
          <td className='hide-on-med-and-up'><a onClick={function(){self.handleDelete(todo)}} className="waves-effect waves-light btn mobile-delete delete"><i className="material-icons">delete</i></a></td>
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
              <th className='hide-on-small-only' data-field="status">Status</th>
              <th className='hide-on-med-and-up'>Delete</th>
          </tr>
        </thead>
        <ReactCSSTransitionGroup
          component="tbody"
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {todoList}
        </ReactCSSTransitionGroup>

      </table>
    )
  }
});

module.exports = {
  TableComponent: TableComponent
}
