import React, { Component } from "react"
import TodoFooter from '../components/TodoFooter'
import { connect } from 'react-redux'
import {
  doneAll,
  deleteAllDone
} from '../reducers/todos'

interface IState extends State{
  total: number
}

interface IProps{
  state: IState,
  doneAll: Function,
  deleteAllDone: Function
}

class TodoFooterContainer extends Component<IProps> {

  async handleDoneAll(event: React.ChangeEvent<{checked: boolean}>) {
    this.props.doneAll(event.target.checked)
  }

  async handleDeleteDone() {
    this.props.deleteAllDone()
  }

  render() {
    const {
      done,
      total
    } = this.props.state
    return (
      <TodoFooter
        done={done}
        total={total}
        handleDeleteDone={this.handleDeleteDone.bind(this)}
        handleDoneAll={this.handleDoneAll.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    state: {
      total: state.todoList.length,
      done: state.done,
      todoList: state.todoList
    }
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    doneAll: (done: boolean) => {
      dispatch(doneAll(done))
    },
    deleteAllDone: () => {
      dispatch(deleteAllDone())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFooterContainer)