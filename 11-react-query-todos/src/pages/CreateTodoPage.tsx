import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { Todo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { useMutation } from '@tanstack/react-query'

const CreateTodoPage = () => {

	const createTodoMutation = useMutation(TodosAPI.createTodo)

	const [success, setSuccess] = useState<boolean | null>(null)
	const navigate = useNavigate()

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		try {
			await createTodoMutation.mutateAsync(todo)

			setTimeout(() => {
				navigate("/todos")
			}, 2000)

			setSuccess(createTodoMutation.isSuccess)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setSuccess(false)

		}
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{success === true && (
				<Alert variant="success" className="mt-3">Todo created!</Alert>
			)}

			{success === false && (
				<Alert variant="warning" className="mt-3">Todo could not be created 😔</Alert>
			)}
		</>
	)
}

export default CreateTodoPage
