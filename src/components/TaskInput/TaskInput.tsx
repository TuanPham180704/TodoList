import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputTodo {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputTodo) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setTodo] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      setTodo('')
    } else {
      addTodo(name)
      setTodo('')
    }
  }
  const handleChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (currentTodo) {
      editTodo(value)
    }
    {
      setTodo(value)
    }
  }

  return (
    <div>
      <h2 className={styles.title}>ToDoList Trọ NMK🏠🪴</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          onChange={handleChang}
          value={currentTodo ? currentTodo.name : name}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
