import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewTodo } from '../types/Todo.types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {
	onAddTodo: (todo: NewTodo) => void
}

type FormData = {
	title: string
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

	const onFormSubmit: SubmitHandler<FormData> = (data: FormData) => {
		// create a new todo and set a new todos state
		const newTodo: NewTodo = {
			title: data.title,
			completed: false,
		}
		onAddTodo(newTodo)   // <-- calls `addTodo()` in `App.tsx`
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
			<InputGroup>
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new Todo"
					{...register('title', {
						required: "You have to write something at least...",
						minLength: {
							value: 5,
							message: "That's too short to be a todo, better do it right now instead!"
						},
					})}
				/>

				<Button
					type="submit"
					variant="success"
				>Create</Button>
			</InputGroup>
			{errors.title && <p className="text-danger">{errors.title.message ?? "Invalid value"}</p>}
		</Form>
	)
}

export default AddNewTodoForm
