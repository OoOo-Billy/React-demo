import React, { Component } from 'react'

export default class TodoItem extends Component{
  handleRemove(){
    this.props.remove(this.props.todo.id)
  }
  handleChecked(){
    this.props.handleDoneOne(this.props.todo.id)
  }
  render(){
    return(
      <div className="todo">
        <div className="todo-title">
          <input type="checkbox" checked={this.props.todo.done} onChange={this.handleChecked.bind(this)}/>
          <h4>{this.props.todo.title}</h4>
          <span onClick={this.handleRemove.bind(this)}>删除</span>
        </div>
        <div className="todo-content">
          <p>{this.props.todo.content}</p>
        </div>
      </div>
    )
  }
}