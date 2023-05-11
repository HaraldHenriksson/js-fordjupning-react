import React from 'react'

interface Iprops {
    finishedTodos: number,
    todos: number,
}

const TodoCounter: React.FC<Iprops> = ({ finishedTodos, todos}) => {
  return (
    <p className="status">
    {finishedTodos} of {todos} todos completed
</p>
  )
}

export default TodoCounter