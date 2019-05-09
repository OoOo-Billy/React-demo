import React, { Component } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import tools from "./../utils/tools";

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = localStorage.todoList
      ? { todoList: JSON.parse(localStorage.todoList) }
      : { todoList: [] };
    this.state = {
      done: this.calculate.call(this),
      ...this.state
    };
  }

  onSubmit(todo) {
    const id = tools.randomId(8);
    if (!todo) return;
    if (!todo.title) return alert("请输入标题");
    if (!todo.content) return alert("请输入内容");
    this.state.todoList.push({ id, done: false, ...todo });
    this.setState({
      todoList: this.state.todoList
    });
    localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
  }

  calculate() {
    let done = 0;
    this.state.todoList.map(todo => {
      return (done += todo.done ? 1 : 0);
    });
    return done;
  }

  async handleRemoveTodo(id) {
    const temp = this.state.todoList;
    for (const index in temp) {
      if (temp[index].id === id) {
        temp.splice(index, 1);
      }
    }
    await this.setState({
      todoList: temp
    });
    this.setState({
      done: this.calculate()
    });
    localStorage.setItem("todoList", JSON.stringify(temp));
  }

  async handleDoneOne(id) {
    const temp = this.state.todoList;
    for (const index in temp) {
      if (temp[index].id === id) {
        temp[index].done = !temp[index].done;
      }
    }
    await this.setState({
      todoList: temp
    });
    this.setState({
      done: this.calculate()
    });
    localStorage.setItem("todoList", JSON.stringify(temp));
  }

  async handleCheckedAll(event) {
    const temp = this.state.todoList;
    for (const item of temp) {
      item.done = event.target.checked;
    }
    await this.setState({
      todoList: temp
    });
    this.setState({
      done: this.calculate()
    });
    localStorage.setItem("todoList", JSON.stringify(temp));
  }

  async handleAllDone() {
    const temp = [];
    for (const key in this.state.todoList) {
      if (!this.state.todoList[key].done) {
        temp.push(this.state.todoList[key]);
      }
    }
    if (temp.length === this.state.todoList.length) {
      alert("并未选择任何事项");
      return;
    }
    await this.setState({
      todoList: temp
    });
    this.setState({
      done: this.calculate()
    });
    localStorage.setItem("todoList", JSON.stringify(temp));
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
    );
  }
}
