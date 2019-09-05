// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

/// <reference path="./../typescript/types.d.ts" />

// reducer
export default function(state: State, action: Action): State {
  // default state
  if (!state) {
    state = {
      todoList: [],
      done: 0
    }
  }

  // trigger action
  switch(action.type) {
    // 初始化评论
    case INIT_COMMENTS:
      if (action.todo) return {
        todoList: [action.todo],
        done: 0
      }

    // 新增评论
    case ADD_COMMENT:
      if (action.todo) return {
        todoList: [...state.todoList, action.todo],
        done: 0
      }

    // 删除评论
    case DELETE_COMMENT:
      if (action.index) return {
        todoList: [
          ...state.todoList.splice(action.index, 1)
        ],
        done: 0
      }

    default:
      return state
  }
}

// action creators
export const initComments = (todo: Todo) => {
  return { type: INIT_COMMENTS, todo }
}

export const addComment = (todo: Todo) => {
  return { type: ADD_COMMENT, todo }
}

export const deleteComment = (index: number) => {
  return { type: DELETE_COMMENT, index }
}
