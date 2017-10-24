import React, { Component } from 'react';
import TodoList from '../TodoList/index';
import PropTypes from 'prop-types';

class TodoListList extends Component {
  static propTypes = {
    listTodoList: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.listTodoList();
  }
  onToggleTodo = (todoId, done) => {
    this.props.updateTodo(todoId, { done });
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
      return (<TodoList
        onToggleTodo={this.onToggleTodo}
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
