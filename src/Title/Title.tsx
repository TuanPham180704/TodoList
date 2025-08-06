import React from 'react'
import styles from './title.module.scss'

type TitleProps = {
  address : {
    street : string
  }
}

function Title() {
  return (
    <h2 className={styles.title}>ToDoList TuanDanny🏠🪴</h2>
  )
}
function equal(prevState : TitleProps,newState : TitleProps) {
  return prevState.address.street === newState.address.street
}


export default React.memo(Title,equal)
