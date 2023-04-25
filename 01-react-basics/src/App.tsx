import { useState } from 'react'
import './App.css'

type Post = {
  id: number,
  title: string,
  likes: number,
}

const App = () => {

const [msg, setMsg] = useState("I'm stateful")
const [count, setCount] = useState(0)
const [posts, _setPosts] = useState<Post[]>([
  { id: 1, title: "React Rocks🤟!", likes: 1337 },
  { id: 2, title: "JSX Rocks Even More☠️!", likes: 1534 },
  { id: 3, title: "Got state?🧐", likes: 8923 },
])

const handleButtonClick = () => {
  console.log("You clicked the button, good boi")
    setMsg("State has been changed")
    setCount(count + 1)
  }
  
  console.table(posts)
const done = () => {
  setMsg('React is wonderful')
}

const [salary, setSalary] = useState(10)

const handleChangeSalary = (amount: number) => {
  if (salary + amount < 5) {
    return setSalary(5)
  }
  setSalary(salary + amount)
}

  return (
    <div className='App'>
    <h1>React Basics</h1>

    <h2>{msg}</h2>

    <p>You have clicked the button {count} times.</p>

    <button onClick={handleButtonClick} className='btn btn-success btn-lg'>👆 me!</button>

    <button onClick={done} className='btn btn-danger btn-lg'>Done</button>

    <hr />

{salary < 10 && <p>You need a new job</p>}

<p>Salary per hour: {salary} &euro;</p>

<div className="buttons">
  <div className="mb-1">
    <button onClick={() => {handleChangeSalary(1)}}
      className="btn btn-primary btn-lg"
    >Raise 1 &euro; 🤑</button>
    <button onClick={() => {handleChangeSalary(-1)}}
      className="btn btn-warning btn-lg"
    >Decrease 1 &euro; 😢</button>
  </div>

  <div className="mb-1">
    <button onClick={() => handleChangeSalary(5)}
      className="btn btn-success btn-lg"
    >Raise 5 &euro; 🤑🤑🤑</button>
    <button onClick={() =>handleChangeSalary(-5)}
      className="btn btn-danger btn-lg"
    >Decrease 5 &euro; 😢😢😢</button>
  </div>
</div>

<hr />

    <ul>
      {
        posts.map(post => (
            <li key={post.id}> 
              {post.title} ({post.likes} Likes)
            </li>
          ))
      }
    </ul>
  </div>
  )
}

export default App
