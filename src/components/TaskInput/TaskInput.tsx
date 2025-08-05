import { useState } from 'react'
import styles from './taskInput.module.scss'
import { log } from 'console'

interface TaskInputTodo {
  addTodo: (name: string) => void
}

export default function TaskInput(props: TaskInputTodo) {
  const { addTodo } = props
  const [name, setTodo] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(name)
    setTodo('')
  }
  const handleChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTodo(value)
  }

  
  return (
    <div>
      <h1 className={styles.title}>ToDoList Trọ NTK </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' onChange={handleChang} value={name} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
