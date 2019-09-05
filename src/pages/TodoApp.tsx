import React, { Component } from "react"
import TodoInput from "../components/TodoInput"
import TodoList from "../components/TodoList"
import TodoFooter from "../components/TodoFooter"
import tools from "../utils/tools"

// export interface Todo{
//   title: string,
//   content: string,
//   createdTime: number,
//   id: string,
//   done: boolean
// }

// interface State{
//   todoList: Array<Todo>,
//   done: number
// }

/// <reference path="./../typescript/types.d.ts" />

export default class TodoApp extends Component<object, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      todoList: localStorage.todoList ? JSON.parse(localStorage.todoList) : [],
      done: 0
    }
  }

  componentDidMount() {
    this.setState({
      done: this.calculate()
    })
  }

  onSubmit(todo:Todo) {
    const id = tools.randomId(8)
    if (!todo) return
    if (!todo.title) return alert("请输入标题")
    if (!todo.content) return alert("请输入内容")
    this.state.todoList.push({ id, done: false, ...todo })
    this.setState({
      todoList: this.state.todoList
    })
    localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
  }

  calculate():number {
    let done = 0
    this.state.todoList.map(todo => {
      return (done += todo.done ? 1 : 0)
    })
    return done
  }

  async handleRemoveTodo(id:string) {
    const temp = this.state.todoList
    // for ... in 返回的数组下标是 string 类型
    for (const index in temp) {
      if (temp[index].id === id) {
        temp.splice(+index, 1)
      }
    }
    await this.setState({
      todoList: temp
    })
    this.setState({
      done: this.calculate()
    })
    localStorage.setItem("todoList", JSON.stringify(temp))
  }

  async handleDoneOne(id:string) {
    const temp = this.state.todoList
    for (const index in temp) {
      if (temp[index].id === id) {
        temp[index].done = !temp[index].done
      }
    }
    await this.setState({
      todoList: temp
    })
    this.setState({
      done: this.calculate()
    })
    localStorage.setItem("todoList", JSON.stringify(temp))
  }

  async handleCheckedAll(event:React.ChangeEvent<{checked: boolean}>) {
    const temp = this.state.todoList
    for (const item of temp) {
      item.done = event.target.checked
    }
    await this.setState({
      todoList: temp
    })
    this.setState({
      done: this.calculate()
    })
    localStorage.setItem("todoList", JSON.stringify(temp))
  }

  async handleAllDone() {
    const temp = []
    for (const key in this.state.todoList) {
      if (!this.state.todoList[key].done) {
        temp.push(this.state.todoList[key])
      }
    }
    if (temp.length === this.state.todoList.length) {
      alert("并未选择任何事项")
      return
    }
    await this.setState({
      todoList: temp
    })
    this.setState({
      done: this.calculate()
    })
    localStorage.setItem("todoList", JSON.stringify(temp))
  }

  render() {
    return (
      <div className="wrapper">
        <TodoInput onSubmit={this.onSubmit.bind(this)} />
        <TodoList
          todoList={this.state.todoList}
          remove={this.handleRemoveTodo.bind(this)}
          handleDoneOne={this.handleDoneOne.bind(this)}
        />
        <TodoFooter
          done={this.state.done}
          total={this.state.todoList.length}
          handleAllDone={this.handleAllDone.bind(this)}
          handleCheckedAll={this.handleCheckedAll.bind(this)}
        />
      </div>
    )
  }
}
