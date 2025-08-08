import { log } from 'console';
import React, {   useEffect, useState, useTransition } from 'react'

const ProductListRender = ({name} : {name : string}) => {
  const [productLists,setProductLists] = useState<string[]>([])
  useEffect(()=>{
    console.log(name);
    const Size = 9999
    const result = []
    for(let i=0;i<Size;i++){
      result.push(name)
    }
    setProductLists(result)
  },[name])

  return(
    <div>
       {productLists.map((productList,index)=>(
        <div key={index}>{productList}</div>
       ))}
    </div>
  )
}

export default function ProductList() {
  const [name,setName] = useState<string>('')
  // const defernamee = useDeferredValue(name)
  const [defername,setDefername] =  useState<string>('')
  const [pending,startTransition] = useTransition()
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    startTransition(()=>{
      setDefername(value)
    })
  }
  console.log('pending',pending);
  
  return (
    <div>
        <h1>ProductList</h1>
        <input
        value={name}
        onChange={handleChange}
        placeholder='enter what you think '
        autoFocus
        type='text'
        />
        {pending && <div>Loading........</div>}
        {!pending && <ProductListRender name={defername}/>}
        
    </div>
  )
}
