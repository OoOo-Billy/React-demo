import React, { Component } from "react"
import { Todo } from './TodoApp'

interface Props{
  todo: Todo,
  handleDoneOne: Function,
  remove: Function
}

interface State{
  timeString: string
}

export default class TodoItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      timeString: ""
    }
  }

  private _timer: number = 0

  componentWillMount() {
    this._updateTimeString();
    this._timer = window.setInterval(this._updateTimeString.bind(this), 5000)
  }
  commentWillUnmount() {
    clearInterval(this._timer)
  }
  _updateTimeString() {
    const todo = this.props.todo
    const duration = (+Date.now() - todo.createdTime) / 1000
    this.setState({
      timeString:
        duration > 60
          ? `${Math.round(duration / 60)} 分钟前`
          : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }
  _getProcessedContent(content: string) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, "<code>$1</code>")
  }
  handleRemove() {
    this.props.remove(this.props.todo.id)
  }
  handleChecked() {
    this.props.handleDoneOne(this.props.todo.id)
  }
  render() {
    return (
      <div className="todo">
        <div className="todo-title">
          <input
            type="checkbox"
            checked={this.props.todo.done}
            onChange={this.handleChecked.bind(this)}
          />
          <h4>{this.props.todo.title}</h4>
          <span onClick={this.handleRemove.bind(this)}>删除</span>
        </div>
        <div className="todo-content">
          <p
            dangerouslySetInnerHTML={{
              __html: this._getProcessedContent(this.props.todo.content)
            }}
          />
          <span>{this.state.timeString}</span>
        </div>
      </div>
    )
  }
}