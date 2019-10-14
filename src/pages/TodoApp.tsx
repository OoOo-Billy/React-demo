import React, { Component } from "react"
import TodoInput from "../containers/TodoInput"
import TodoList from "../containers/TodoList"
import TodoFooter from "../containers/TodoFooter"

export default class TodoApp extends Component {

  render() {
    return (
      <div className="wrapper">
        <TodoInput />
        <TodoList />
        <TodoFooter />
      </div>
    )
  }
}
