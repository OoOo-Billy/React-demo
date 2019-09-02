import React, { Component } from "react"
import TodoItemTag from "./TodoItem"
import { Todo } from './TodoApp'

interface Props{
  todoList: Array<Todo>,
  handleDoneOne: Function
  remove: Function
}

export default class TodoList extends Component<Props> {
  render() {
    if (this.props.todoList.length !== 0) {
      return (
        <div>
          <div className="todo-list">
            {this.props.todoList.map(todo => (
              <TodoItemTag
                key={todo.id}
                todo={todo}
                handleDoneOne={this.props.handleDoneOne}
                remove={this.props.remove}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}
