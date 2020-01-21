import React, { Component } from "react"
import TodoInput from '../components/TodoInput'
import { connect } from 'react-redux'
import {
  addTodo
} from '../reducers/todos'


interface IProps{
  // state: State,
  onSubmit?: (todo:Todo) => void
}

class TodoInputContainer extends Component<IProps> {

  handleSubmit(todo: Todo) {
    // 待办事项数据的验证
    if (!todo.title) return alert('请输入标题')
    if (!todo.content) return alert('请输入待办事项')

    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增待办事项
    if (this.props.onSubmit) {
      this.props.onSubmit(todo)
    } else {
      console.log("haven't send a function onSubmit")
    }
  }

  render() {
    return (
      <TodoInput onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

// const mapStateToProps = (state: State) => {
//   return {
//     state: {
//       todoList: state.todoList,
//       done: state.done
//     }
//   }
// }

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmit: (todo: Todo) => {
      dispatch(addTodo(todo))
    }
  }
}

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(TodoInputContainer)
