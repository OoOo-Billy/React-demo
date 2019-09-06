// action types
const INIT_TODOLIST = 'INIT_TODOLIST'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const DONE_TODO = 'DONE_TODO'

// reducer
export default function(state: State, action: Action): State | void {
  // default state
  if (!state) {
    state = {
      todoList: [],
      done: 0
    }
  }

  // trigger action
  switch(action.type) {
    // 初始化待办事项列表
    case INIT_TODOLIST:
      if (action.todoList) return {
        todoList: [...action.todoList],
        done: 0
      }
      break

    // 新增待办事项
    case ADD_TODO:
      if (action.todo) return {
        todoList: [...state.todoList, action.todo],
        done: 0
      }
      break

    // 删除待办事项
    case DELETE_TODO:
      if (action.index || typeof action.index === 'number') {
        return {
          todoList: [
            ...state.todoList.slice(0, action.index),
            ...state.todoList.slice(action.index + 1),
          ],
          done: 0
        }
      }
      break

    // 完成待办事项
    case DONE_TODO:
      if (action.index || typeof action.index === 'number') {
        state.todoList[action.index].done = true
        return {
        todoList: [...state.todoList],
        done: 0
        }
      }
      break

    default:
      return state
  }
}

// action creators
export const initTodoList = (todoList: Array<Todo>) => {
  return { type: INIT_TODOLIST, todoList }
}

export const addTodo = (todo: Todo) => {
  return { type: ADD_TODO, todo }
}

export const deleteTodo = (index: number) => {
  return { type: DELETE_TODO, index }
}

export const doneTodo = (index: number) => {
  return { type: DONE_TODO, index }
}
