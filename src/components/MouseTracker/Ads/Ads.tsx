import websiteUI from '../../../images/React-JS-Development.jpeg'

export default function Ads({x,y} : {x : number , y : number}) {
  return (
    <div>
      <img src={websiteUI} alt='websiteUI' style={{width : '100rem' , height : 'auto' }}/>
      <p>Position Mouse</p>
      <ul>
        <li>x : {x}</li>
        <li>y : {y}</li>
      </ul> 
    </div>
  )
}
