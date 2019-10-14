import updateStorage from '../plugins/updateStorage'

// action types
const INIT_TODOLIST = 'INIT_TODOLIST'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const DONE_TODO = 'DONE_TODO'
const DONE_ALL = 'DONE_ALL'
const DELETE_ALL_DONE = 'DELETE_ALL_DONE'

const calculate = (todoList: Array<Todo>):number => {
  let done = 0
  todoList.map(todo => {
    return (done += todo.done ? 1 : 0)
  })
  return done
}

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
        done: calculate(action.todoList)
      }
      break

    // 新增待办事项
    case ADD_TODO:
      if (action.todo) {
        const todoList = [...state.todoList, action.todo]
        updateStorage('todoList', todoList)
        return {
          todoList,
          done: calculate(todoList)
        }
      }
      break

    // 删除待办事项
    case DELETE_TODO:
      if (action.index || typeof action.index === 'number') {
        const todoList = [
          ...state.todoList.slice(0, action.index),
          ...state.todoList.slice(action.index + 1),
        ]
        updateStorage('todoList', todoList)
        return {
          todoList,
          done: calculate(todoList)
        }
      }
      break

    // 完成待办事项
    case DONE_TODO:
      if (action.index || typeof action.index === 'number') {
        const newTodoList = [...state.todoList]
        newTodoList[action.index].done = !newTodoList[action.index].done
        updateStorage('todoList', newTodoList)
        return {
          todoList: [...newTodoList],
          done: calculate(newTodoList)
        }
      }
      break

    case DONE_ALL:
      if (action.done !== undefined) {
        const newTodoList = [...state.todoList]
        for (const item of newTodoList) {
          item.done = action.done
        }
        updateStorage("todoList", newTodoList)
        return {
          todoList: [...newTodoList],
          done: calculate(newTodoList)
        }
      }
      break

    case DELETE_ALL_DONE:
      const newTodoList = []
      for (const key in state.todoList) {
        if (!state.todoList[key].done) {
          newTodoList.push(state.todoList[key])
        }
      }
      if (newTodoList.length === state.todoList.length) {
        alert("并未选择任何事项")
        return state
      } else {
        updateStorage("todoList", newTodoList)
        return {
          todoList: [...newTodoList],
          done: calculate(newTodoList)
        }
      }

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

export const doneAll = (done: boolean) => {
  return { type: DONE_ALL, done }
}

export const deleteAllDone = () => {
  return { type: DELETE_ALL_DONE }
}
