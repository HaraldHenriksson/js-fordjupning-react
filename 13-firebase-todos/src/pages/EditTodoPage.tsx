import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import useAuth from '../hooks/useAuth'
import useGetTodo from '../hooks/useGetTodo'
import { todosCol } from '../services/firebase'
import { TodoFormData } from '../types/Todo.types'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { currentUser } = useAuth()

	const documentId = id as string

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	const updateTodo = async (data: TodoFormData) => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Set the contents of the document
		toast.promise(updateDoc(docRef, {
			...data,
			updated_at: serverTimestamp(),
		}), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})
	}

	if (todo && todo.uid !== currentUser?.uid) {
		return (
			<Container className="py-3">
				<h1>Access denied</h1>
			</Container>
		)
	}

	return (
		<Container className="py-3">
			<h1>Edit: {todo.title}</h1>

			<TodoForm onSave={updateTodo} initialValues={todo} />

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</Container>
	)
}

export default EditTodoPage
