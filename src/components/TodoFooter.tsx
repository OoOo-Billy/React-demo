import React, { Component } from "react"

interface IProps{
  done: number,
  total: number,
  handleDeleteDone: () => void,
  handleDoneAll: (event:React.ChangeEvent<{checked: boolean}>) => void
}

export default class TodoFooter extends Component<IProps> {
  render() {
    const {
      done,
      total,
      handleDoneAll,
      handleDeleteDone
    } = this.props
    return (
      <div className="todo-footer">
        <input
          type="checkbox"
          checked={
            done === total && done !== 0
          }
          onChange={handleDoneAll}
        />
        <span>
          已完成{done}件 / 总计{total}件
        </span>
        <button onClick={handleDeleteDone}>清除已完成事项</button>
      </div>
    )
  }
}
