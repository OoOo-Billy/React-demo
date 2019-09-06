import React, { Component } from "react"
import TodoInput from "../containers/TodoInput"
import TodoList from "../containers/TodoList"
// import TodoFooter from "../components/TodoFooter"

export default class TodoApp extends Component {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     todoList: localStorage.todoList ? JSON.parse(localStorage.todoList) : [],
  //     done: 0
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     done: this.calculate()
  //   })
  // }

  // calculate():number {
  //   let done = 0
  //   this.state.todoList.map(todo => {
  //     return (done += todo.done ? 1 : 0)
  //   })
  //   return done
  // }

  // async handleCheckedAll(event:React.ChangeEvent<{checked: boolean}>) {
  //   const temp = this.state.todoList
  //   for (const item of temp) {
  //     item.done = event.target.checked
  //   }
  //   await this.setState({
  //     todoList: temp
  //   })
  //   this.setState({
  //     done: this.calculate()
  //   })
  //   localStorage.setItem("todoList", JSON.stringify(temp))
  // }

  // async handleAllDone() {
  //   const temp = []
  //   for (const key in this.state.todoList) {
  //     if (!this.state.todoList[key].done) {
  //       temp.push(this.state.todoList[key])
  //     }
  //   }
  //   if (temp.length === this.state.todoList.length) {
  //     alert("并未选择任何事项")
  //     return
  //   }
  //   await this.setState({
  //     todoList: temp
  //   })
  //   this.setState({
  //     done: this.calculate()
  //   })
  //   localStorage.setItem("todoList", JSON.stringify(temp))
  // }

  render() {
    return (
      <div className="wrapper">
        <TodoInput />
        <TodoList />
        {/* <TodoFooter
          done={this.state.done}
          total={this.state.todoList.length}
          handleAllDone={this.handleAllDone.bind(this)}
          handleCheckedAll={this.handleCheckedAll.bind(this)}
        /> */}
      </div>
    )
  }
}
