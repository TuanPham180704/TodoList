import { Todo } from '../../@types/todo.type'
import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodoList = todos.filter((todo) => todo.done)
  const notDoneTask = todos.filter((todo) => !todo.done)
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }
  const startEditTodo = (id: string) => {
    const finedTodo = todos.find((todo) => todo.id === id)
    if (finedTodo) {
      setCurrentTodo(finedTodo)
    }
  }
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }
  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id == (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    })
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList todos={notDoneTask} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} />
        <TaskList doneTaskList todos={doneTodoList} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} />
      </div>
    </div>
  )
}
