import React, { useState } from 'react'
import Ads from './Ads/Ads'

interface PositionType {
  x : number
  y : number
}

export default function MouseTracker() {
  const [positionType,setPositionType] =useState<PositionType>({x : 0 , y: 0})
  const handelMouseTracker = (e : React.MouseEvent<HTMLDivElement,MouseEvent>) => {
     setPositionType({
      x : e.clientX,
      y : e.clientY
     })
  }
  return (
    <div onMouseMove={handelMouseTracker}>
      <p style={{color : 'red'}}>Mouse Tracker</p>
      <Ads {...positionType}/>
    </div>
  )
}
