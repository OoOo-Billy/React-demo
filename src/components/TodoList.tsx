import React, { Component } from "react"
import TodoItemTag from "./TodoItem"

interface IProps{
  todoList: Array<Todo>,
  handleDoneOne: Function
  remove: Function
}

export default class TodoList extends Component<IProps> {
  render() {
    if (this.props.todoList.length !== 0) {
      return (
        <div>
          <div className="todo-list">
            {this.props.todoList.map((todo, index) => (
              <TodoItemTag
                key={todo.id}
                index={index}
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
