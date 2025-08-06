import { Todo } from '../../@types/todo.type'
import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}
const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodoList = todos.filter((todo) => todo.done)
  const notDoneTask = todos.filter((todo) => !todo.done)
  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    const handler = (todosObj: Todo[]) => {
      return [...todosObj, todo]
    }
    setTodos((prev) => [...prev, todo])
    syncReactToLocal(handler)
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (prev: Todo[]) => {
      return prev.map((todo) => (todo.id === id ? { ...todo, done } : todo))
    }
    setTodos(handler)
    syncReactToLocal(handler) 
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
    const handler = (todObj: Todo[]) => {
      return todObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }
  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todObj: Todo[]) => {
      const finedIndexTodo = todObj.findIndex((todo) => todo.id === id)
      if (finedIndexTodo > -1) {
        const result = [...todObj]
        result.splice(finedIndexTodo, 1)
        return result
      }
      return todObj
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo}  />
        <TaskList
          todos={notDoneTask}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodoList}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
