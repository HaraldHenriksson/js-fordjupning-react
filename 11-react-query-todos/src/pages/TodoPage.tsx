import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import ConfirmationModal from '../components/ConfirmationModal'
import { useQuery } from '@tanstack/react-query'
import { getTodo } from '../services/TodosAPI'

const TodoPage = () => {
	const [error, _setError] = useState<string | null>(null)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const { data: todo, refetch, isLoading } = useQuery({
		queryKey: ['get-todos', todoId],
		queryFn: () => TodosAPI.getTodo(todoId)
	})

	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// if (!window.confirm('U SURE BRO?!')) {
		// 	return
		// }

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Navigate user to `/todos` (using state)
		// navigate('/todos', {
		// 	replace: true,
		// 	state: {
		// 		message: `Todo "${todo.title}" was successfully deleted`,
		// 	},
		// })

		// Navigate user to `/todos` (using search params/query params)
		navigate('/todos?deleted=true', {
			replace: true,
		})
	}

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		// update todo state with the updated todo
		refetch()
	}

	// useEffect(() => {
	// 	if (typeof todoId !== "number") {
	// 		return
	// 	}

	// 	getTodo(todoId)
	// }, [todoId])

	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant='primary' onClick={() => getTodo(todoId)}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button variant='success' onClick={() => toggleTodo(todo)}>Toggle</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button variant='warning'>Edit</Button>
				</Link>

				<Button variant='danger' onClick={() => setShowConfirmDelete(true)}>Delete</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() => deleteTodo(todo)}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
