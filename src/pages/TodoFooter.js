import React, { Component } from 'react'

export default class TodoFooter extends Component{
  render(){
    return(
      <div className="todo-footer">
        <input type="checkbox" checked={(this.props.done === this.props.total) && this.props.done !== 0} onChange={this.props.handleCheckedAll}/>
        <span>已完成{this.props.done}件 / 总计{this.props.total}件</span>
        <button onClick={this.props.handleAllDone}>清除已完成事项</button>
      </div>
    )
  }
}