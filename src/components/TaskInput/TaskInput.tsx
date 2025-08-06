import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import connect, { ExtraInfoType } from '../../HOC/connect'
import { log } from 'console'
import Title from '../../Title'


interface TaskInputTodo  extends ExtraInfoType{
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

function TaskInput(props: TaskInputTodo) {
  const { addTodo, currentTodo, editTodo, finishEditTodo ,debug} = props
  const [name, setTodo] = useState<string>('')
  const address = {
    street : '10 Tran Hung Dao'
  }
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
      <Title address={address}/>
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

export default connect<TaskInputTodo>(TaskInput)
