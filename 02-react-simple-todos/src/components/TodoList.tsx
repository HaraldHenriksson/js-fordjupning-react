import React from 'react'
import { Todo } from '../types'
import TodoListItem from './TodoListItem';

interface Iprops {
    todos: Todo[];
    onToggle: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
}

const TodoList: React.FC<Iprops> = ({todos, onToggle, onDelete}) => {
  return (
    <ul className="todolist">
      {todos.map((todo, index) => (
        <TodoListItem 
          onToggle={onToggle}
          onDelete={onDelete}
          todo={todo} 
          key={index}
        />
      ))}
    </ul>
  )
}

export default TodoList