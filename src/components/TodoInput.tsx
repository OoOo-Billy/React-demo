import React, { Component } from "react"

interface IProps{
  onSubmit?: Function
}

interface IState{
  title: string,
  content: string
}

interface Event extends React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>{}

export default class TodoInput extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props)
    this.state = {
      title: "",
      content: ""
    }
  }

  private text: HTMLInputElement | null = null

  handleTitleChange(event: Event) {
    this.setState({
      title: event.target.value
    })
  }

  handleContentChange(event: Event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit() {
    const createdTime = Date.now()
    if (this.props.onSubmit) {
      const { title, content } = this.state
      this.props.onSubmit({ title, content, createdTime })
    } else {
      console.log("haven't send a function onSubmit")
    }
    this.setState({ title: "", content: "" })
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
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}
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
              value={this.state.content}
              placeholder="请输入"
              onChange={this.handleContentChange.bind(this)}
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
