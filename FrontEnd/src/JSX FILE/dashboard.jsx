import react, { useEffect, useLayoutEffect, useState } from 'react'
import '../App.css'

export default function Dashboard({props, prof}) {
    console.log(props, prof)
    const [count, setcount] = useState(0)

  
    
    return (
        <>
        <p>Welcome to the dash board {prof} </p>
        
        </>
    )
}