export default function(key: string, value: Array<Todo>) {
  localStorage.setItem(key, JSON.stringify(value))
}