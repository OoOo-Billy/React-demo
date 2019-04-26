import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends Component{
  static defaultProps = {
    todoList: []
  }
  render(){
    if (this.props.todoList.length !== 0) {
      return(
        <div>
          <div className="todo-list">
            {this.props.todoList.map((todo,index)=>
              <TodoItem key={todo.id} todo={todo} handleDoneOne={this.props.handleDoneOne} remove={this.props.remove}/>
            )}
          </div>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
}