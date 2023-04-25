import { useState } from 'react'
import './App.css'

const App = () => {
  
  let [msg, setMsg] = useState("I'm stateful")
  let [count, setCount] = useState(0)

  const handleButtonClick = () => {
    console.log("You clicked the button, good boi")
    setMsg("State has been changed")
    setCount(count + 1)
  }

  return (
  <div className='App'>
    <h1>React Basics</h1>

    <h2>{msg}</h2>

    <p>You have clicked the button {count} times.</p>

    <button onClick={handleButtonClick} className='btn btn-success btn-lg'>👆 me!</button>
  </div>
  )
}

export default App
