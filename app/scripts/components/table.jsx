var React = require('react');

var TableComponent = React.createClass({
  getInitialState: function(){
    var todoCollection = this.props.todoCollection;

    return {
      todoCollection: todoCollection
    }
  },

  componentWillReceiveProps: function(nextProps){
    // this.setState({todoCollection: nextProps.todoCollection});
  },

  render: function(){
    var todoCollection = this.state.todoCollection;
    console.log(todoCollection.models);
    var todoList = todoCollection.models.map(function(todo){
      console.log(todo, 'todo');
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
