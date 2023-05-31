import React from 'react'
import { Todo } from '../types'
import { Button } from 'react-bootstrap'

interface IProps {
	todo: Todo
	onDelete: (todoToDelete: Todo) => void
	onToggle: (todo: Todo) => void
}

const TodoListItem: React.FC<IProps> = ({ todo, onDelete, onToggle }) => {

	return (
		<div className={todo.completed ? 'done' : ''}>

			<span className="ms-1">
				<Button variant="success" className="todo-toggle" onClick={() => onToggle(todo)} role="button">
					{todo.completed ? '☑️' : '✅'}
				</Button>
				<Button variant="danger" className="todo-delete" onClick={() => onDelete(todo)} role="button">
					Delete
				</Button>
			</span>
		</div>
	)
}

export default TodoListItem
