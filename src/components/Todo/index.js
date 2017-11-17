import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Todo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  state = {
    checked: false,
  };

  componentWillMount() {
    this.setState({
      checked: this.props.done,
    });
  }

  onToggleTodo = () => {
    this.props.updateTodo(this.props.id, { done: !this.props.done });
    this.setState({
      checked: !this.state.checked,
    });
  };

  deleteTodo = () => {
    this.props.deleteTodo(this.props.id);
  };

  render() {
    return (
      <div className="todo">
        <label>
          <input onChange={this.onToggleTodo} type="checkbox" checked={this.state.checked}/>
          {this.props.description}
        </label>
        <button onClick={this.deleteTodo} className="btn-close">X</button>
      </div>
    );
  }
}

export default Todo;
