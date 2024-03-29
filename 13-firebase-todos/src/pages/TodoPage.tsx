import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { todosCol } from "../services/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { Container } from "react-bootstrap"
import useAuth from "../hooks/useAuth"

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const { currentUser } = useAuth()

	const documentId = id as string

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	const deleteTodo = async () => {

		// Get a reference to get doc
		const docRef = doc(todosCol, documentId)

		// Delete doc
		await deleteDoc(docRef)

		toast.success("Todo Deleted")


		// Redicet and replace the current history entry for this page 
		navigate('/todos', {
			replace: true,
		})
	}

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	if (todo && todo.uid !== currentUser?.uid) {
		return (
			<Container className="py-3">
				<h1>Access denied</h1>
			</Container>
		)
	}

	return (
		<>
			<Container className="py-3">
				<div className="d-flex justify-content-between align-items-start">
					<h1>{todo.title}</h1>
				</div>

				<p>
					<strong>Status:</strong>{" "}
					{todo.completed ? "Completed" : "Not completed"}
				</p>

				<div className="buttons mb-3">
					<Link to={`/todos/${id}/edit`}>
						<Button variant="warning">Edit</Button>
					</Link>

					<Button
						variant="danger"
						onClick={() => setShowConfirmDelete(true)}
					>
						Delete
					</Button>
				</div>

				<ConfirmationModal
					show={showConfirmDelete}
					onCancel={() => setShowConfirmDelete(false)}
					onConfirm={deleteTodo}
				>
					U SURE BRO?!
				</ConfirmationModal>

				<Link to="/todos">
					<Button variant="secondary">&laquo; All todos</Button>
				</Link>
			</Container>
		</>
	)
}

export default TodoPage
