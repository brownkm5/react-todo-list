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

    var date = new Date();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    var currentDate = (date.getMonth() + 1) + "/" + date.getDate() + '/' + date.getFullYear();
    var currentTime = date.getHours() > 12 ?  (date.getHours() - 12) + ':' + minutes + ' ' + 'pm' : date.getHours() + ':' + minutes + ' ' + 'am' ;

    var todo = {
      todoItem: this.state.todoItem,
      finishBy: this.state.finishBy,
      status: false,
      dateAdded: currentDate,
      timeAdded: currentTime,
      finished: 'no'
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
              <div className="input-field col s6 m5">
                <input onChange={this.handleTodo} placeholder="To do item" id="first_name" type="text" className="todo-input validate" value={this.state.todoItem} />
              </div>
              <div className="input-field col s6 m5">
                <input onChange={this.handleFinish} placeholder="Finish by" id="last_name" type="text" className="finish-by-input validate" value={this.state.finishBy} />
              </div>
              <button className="hide-on-small-only btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
              <button className="hide-on-med-and-up btn waves-effect waves-light" type="submit" name="action">Submit</button>
            </div>
          </form>
        </div>
    )
  }
});

module.exports = {
  FormComponent: FormComponent
}
