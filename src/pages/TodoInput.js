import React, { Component } from 'react'

export default class TodoInput extends Component{
  constructor(){
    super();
    this.state={
      title: '',
      content: ''
    }
  }
  handleTitleChange(event){
    // console.log(event.target.value);
    this.setState({
      title: event.target.value
    })
  }
  handleContentChange(event){
    // console.log(event.target.value)
    this.setState({
      content: event.target.value
    })
  }
  handleSubmit(){
    if (this.props.onSubmit) {
      const { title, content } = this.state
      this.props.onSubmit({title, content})
    }else{
      console.log('haven\'t send a function onSubmit')
    }
    this.setState({ title: '', content: '' })
  }
  render(){
    return(
      <div className="todo-input">
        <div className="todo-field">
         <label htmlFor="title" className="todo-field-name">代办事项标题:</label>
         <div className="todo-field-input">
          <input id="title" type="text" placeholder="请输入" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
         </div>
        </div>
        <div className="todo-field">
          <label htmlFor="content" className="todo-field-name">待办事项内容:</label>
          <div className="todo-field-input">
            <textarea id="content" className="todo-field-input" value={this.state.content} placeholder="请输入" onChange={this.handleContentChange.bind(this)}></textarea>
          </div>
        </div>
        <div className='todo-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}