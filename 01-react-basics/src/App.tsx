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

  return (
    <div className='App'>
    <h1>React Basics</h1>

    <h2>{msg}</h2>

    <p>You have clicked the button {count} times.</p>

    <button onClick={handleButtonClick} className='btn btn-success btn-lg'>👆 me!</button>

    <button onClick={done} className='btn btn-danger btn-lg'>Done</button>

    <h2>Posts</h2> 

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
