var React = require('react');

var FormComponent = React.createClass({
  getInitialState: function(){
    return {
      todoItem: '',
      finishBy: ''
    }
  },

  handleTodo: function(e){
    var todoItem = e.target.value;

    this.setState({todoItem: todoItem});
  },

  handleFinish: function(e){
    var finishBy = e.target.value;

    this.setState({finishBy: finishBy});
  },

  handleAddTodo: function(e){
    e.preventDefault();
    var currentTime = new Date();

    var todo = {
      todoItem: this.state.todoItem,
      finishBy: this.state.finishBy,
      status: false,
      dateAdded: currentTime
    };

    this.props.addTodo(todo);

    this.setState({
      todoItem: '',
      finishBy: ''
    });
  },

  render: function(){

    return (
      <div className="todo-form">
          <form onSubmit={this.handleAddTodo} className="col s12">
            <div className="row">
              <div className="input-field col s4">
                <input onChange={this.handleTodo} placeholder="To do item" id="first_name" type="text" className="todo-input validate" value={this.state.todoItem} />
              </div>
              <div className="input-field col s4">
                <input onChange={this.handleFinish} placeholder="Finish by" id="last_name" type="text" className="finish-by-input validate" value={this.state.finishBy} />
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
    )
  }
});

module.exports = {
  FormComponent: FormComponent
}
