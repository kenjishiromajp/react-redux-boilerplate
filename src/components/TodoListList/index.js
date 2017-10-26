import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoListContainer from "../../containers/TodoListContainer";

class TodoListList extends Component {
  static propTypes = {
    listTodoList: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.listTodoList();
  }
  renderTodos = () => {
    const todolists = this.props.todolists.items;
    const todolistsIds = Object.keys(todolists);

    const todos = this.props.todos.items;
    const todosIds = Object.keys(todos);

    if (!todolistsIds.length || !todosIds.length) { return <h1>Loading</h1>; }

    const todoListsComponents = todolistsIds.map((todolistId) => {
      const todolist = { ...todolists[todolistId] };
      todolist.todos = todolist.todos.map(todoId => todos[todoId]);
      return (<TodoListContainer
        key={todolistId}
        {...todolist}
      />);
    });
    return todoListsComponents;
  }
  render() {
    return (
      <ul className="todolist-container">
        {this.renderTodos()}
      </ul>
    );
  }
}
export default TodoListList;
