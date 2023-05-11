import React from 'react'
import { Todo } from '../types'

interface Iprops {
    todo: Todo,
    onToggle: (todo: Todo) => void,
    onDelete: (todoToDelete: Todo) => void
}


const TodoListItem: React.FC<Iprops> = ({ todo, onToggle, onDelete }) => {

  return (
    <li className={todo.completed ? 'done' : ''}>
		<span className="todo-title">
			{todo.title}
		</span>

		<span className="ms-1">
			<span className="todo-toggle" onClick={() => onToggle(todo)} role="button">
				{todo.completed ? '☑️' : '✅'}
			</span>
			<span className="todo-delete" onClick={() => onDelete(todo)} role="button">
				🗑️
			</span> 
		</span> 
	</li>
  )
}

export default TodoListItem
