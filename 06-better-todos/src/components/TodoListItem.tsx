import React from 'react'
import { Todo } from '../types'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface IProps {
	todo: Todo
	onDelete: (todoToDelete: Todo) => void
	onToggle: (todo: Todo) => void
}

const TodoListItem: React.FC<IProps> = ({ todo, onDelete, onToggle }) => {
	const navigate = useNavigate()

	return (
		<div className={todo.completed ? 'done' : ''}>

			<span className="ms-1">
				<Button variant="success" className="todo-toggle" onClick={() => onToggle(todo)} role="button">
					{'Toggle'}
				</Button>
				<Button variant="outline-secondary" className="todo-edit" onClick={() => navigate(`/todos/${todo.id}/edit`)} role="button">
					{'Edit'}
				</Button>
				<Button variant="danger" className="todo-delete" onClick={() => onDelete(todo)} role="button">
					Delete
				</Button>
			</span>
		</div>
	)
}

export default TodoListItem
