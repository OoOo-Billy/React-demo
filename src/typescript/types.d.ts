interface State {
  todoList: Array<Todo>,
  done: number
}

interface Todo {
  title: string,
  content: string,
  createdTime: number,
  id: string,
  done: boolean
}


interface Action {
  type?: string,
  todoList?: Array<Todo>,
  todo?: Todo,
  index?: number,
  done?: boolean
}