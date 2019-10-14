import React, { Component } from "react"
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {
  initTodoList,
  deleteTodo,
  doneTodo
} from '../reducers/todos'

interface IProps {
  state: State,
  initTodoList: Function,
  deleteTodo: Function,
  doneTodo: Function
}

// TodoListContainer
// 一个 Smart 组件，负责待办事项列表数据的加载、初始化、删除、标记完成
// 沟通 TodoList 和 state
class TodoListContainer extends Component<IProps> {
  componentDidMount() {
    // componentWillMount 生命周期中初始化待办事项
    this._loadTodoList()
  }

  private _loadTodoList() {
    // 从 LocalStorage 中加载待办事项
    let list = localStorage.todoList
    list  = list ? JSON.parse(list) : []
    console.log('初始化之后的List', list)
    // this.props.initTodoList 是 connect 传进来的
    // 可以帮我们把数据初始化到 state 里面去
    this.props.initTodoList(list)
  }

  handleRemoveTodo (index: number) {
    if (this.props.deleteTodo) {
      // this.props.deleteTodo 是 connect 传进来的
      // 会 dispatch 一个 action 去删除评论
      this.props.deleteTodo(index)
    }
  }

  handleDoneTodo (index: number) {
    if (this.props.doneTodo) {
      this.props.doneTodo(index)
    }
  }

  render () {
    return (
      <TodoList
        todoList={this.props.state.todoList}
        remove={this.handleRemoveTodo.bind(this)}
        handleDoneOne={this.handleDoneTodo.bind(this)}
      />
    )
  }
}

// 待办事项从 state.todoList 中获取
const mapStateToProps = (state: State) => {
  return {
    state: {
      todoList: state.todoList,
      done: state.done
    }
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    // 提供给 TodoListContainer
    // 当从 LocalStorage 加载待办事项列表以后就会通过这个方法
    // 把待办事项列表初始化到 state 当中
    initTodoList: (todoList:Array<Todo>) => {
      dispatch(initTodoList(todoList))
    },
    // 删除待办事项
    deleteTodo: (index: number) => {
      dispatch(deleteTodo(index))
    },
    // 标记完成待办事项
    doneTodo: (index: number) => {
      dispatch(doneTodo(index))
    }
  }
}

// 将 TodoListContainer connect 到 store
// 会把 todoList、initTodoList、deleteTodo、doneTodo 传给 CommentListContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer)