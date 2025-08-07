import React, { useRef } from 'react'
import styles from './title.module.scss'

type TitleProps = {
  address: {
    street: string
  }
}

function Title() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const clickRef = () => {
    if (h1Ref.current) {
      h1Ref.current.style.color = 'blue'
    }
  }
  return (
    <h2 className={styles.title} ref={h1Ref} onClick={clickRef}>
      ToDoList TuanDanny🏠🪴
    </h2>
  )
}
function equal(prevState: TitleProps, newState: TitleProps) {
  return prevState.address.street === newState.address.street
}

export default React.memo(Title, equal)
