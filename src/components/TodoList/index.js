import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./style.scss";
import TodoContainer from "../../containers/TodoContainer";

class TodoList extends Component{
    static propTypes = {

    };
    render(){
        return(
            <div className="card todolist">
                <h3>{this.props.title}</h3>
                <ul>
                    {this.props.todos.map( (todo, key) => <TodoContainer {...todo} key={key} />)}
                </ul>
            </div>
        );
    }
}
export default TodoList;
