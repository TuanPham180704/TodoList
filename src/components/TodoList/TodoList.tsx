import { Todo } from '../../@types/todo.type'
import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
export default function TodoList() {
   const [todos,setTodos] = useState<Todo[]>([])
   const addTodo = (name : string) => {
      const todo: Todo = {
        name,
        done: false,
        id : new Date().toISOString()
      }
      setTodos((prev) => [...prev,todo])
    }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
      <TaskInput/>
      <TaskList/>
      <TaskList doneTaskList/>
      </div>
    </div>
  )
}
