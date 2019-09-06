import React, { Component } from "react"
import tools from "../utils/tools"

interface IProps{
  onSubmit?: (todo:Todo) => void
}

export default class TodoInput extends Component<IProps> {

  private text: HTMLInputElement | null = null
  private title: string = ''
  private content: string = ''

  handleSubmit() {
    const createdTime = Date.now()
    if (this.props.onSubmit) {
      const { title, content } = this
      const id = tools.randomId(8)
      this.props.onSubmit({
        id,
        title,
        content,
        createdTime,
        done: false
      })
    } else {
      console.log("haven't send a function onSubmit")
    }
    this.title = this.content = ''
    this.text && (this.text.value = '')
    const textareaEle = document.querySelector<HTMLTextAreaElement>('#content')
    textareaEle && (textareaEle.value = '')
  }

  render() {
    return (
      <div className="todo-input">
        <div className="todo-field">
          {/* react 为了避免与 for 冲突，改成了 htmlFor */}
          <label htmlFor="title" className="todo-field-name">
            代办事项标题:
          </label>
          <div className="todo-field-input">
            <input
              ref={inputEle => (this.text = inputEle)}
              id="title"
              type="text"
              placeholder="请输入"
              onChange={(e) => this.title = e.target.value}
            />
          </div>
        </div>
        <div className="todo-field">
          {/* react 为了避免与 for 冲突，改成了 htmlFor */}
          <label htmlFor="content" className="todo-field-name">
            待办事项内容:
          </label>
          <div className="todo-field-input">
            <textarea
              id="content"
              className="todo-field-input"
              placeholder="请输入"
              onChange={(e) => this.content = e.target.value}
            />
          </div>
        </div>
        <div className="todo-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.text && this.text.focus()
  }
}
