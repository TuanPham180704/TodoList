import { Todo } from '../../@types/todo.type'
import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
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
  const handleDoneTodo = (id : string,done : boolean) => {
    setTodos((prev)=> {
      return prev.map((todo)=> {
        if(todo.id === id){
          return {...todo,done}
        }
        return todo
      })
    })
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={notDoneTask} handleDoneTodo={handleDoneTodo}/>
        <TaskList doneTaskList todos={doneTodoList} handleDoneTodo={handleDoneTodo}/>
      </div>
    </div>
  )
}
