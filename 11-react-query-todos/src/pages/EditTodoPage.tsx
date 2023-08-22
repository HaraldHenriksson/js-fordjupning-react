import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PartialTodo } from '../types/TodosAPI.types'

const EditTodoPage = () => {
	const [error, setError] = useState<string | null>(null)
	const [newTodoTitle, setNewTodoTitle] = useState("")
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo
	} = useQuery(['todo', { id: todoId }], () =>
		TodosAPI.getTodo(todoId)
	)

	const queryClient = useQueryClient()

	const updateTodoMutation = useMutation(
		(data: PartialTodo) => TodosAPI.updateTodo(todoId, data),
		{
			onSuccess: () => {
				navigate(`/todos/${todoId}`)
			},
			onError: () => {
				setError('Todo could not be updated 😔')
			},
		}

	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todo || !todo.id) {
			return
		}

		const updatedTodo = {
			title: newTodoTitle,
		}

		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id, {
			title: newTodoTitle,
		})

		updateTodoMutation.mutateAsync(updatedTodo)

		// redirect user to /todos/:id
		navigate(`/todos/${todo.id}`)

		queryClient.invalidateQueries(['todo', { id: todoId }])
	}

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={(e) => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
