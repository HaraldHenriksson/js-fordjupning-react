import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo } from "../types/Todo.types"
import useGetTodos from '../hooks/useGetTodos'
import { todosCol } from "../services/firebase"
import { addDoc } from "firebase/firestore"

const TodosPage = () => {

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		try {
			const docRef = await addDoc(todosCol, {
				title: todo.title,
				completed: false,
			})
			console.log("Document added: ", docRef.id)
			fetchData()
		} catch (error) {
			console.error("Error adding document: ", error)
		}
	}

	// Get todos
	const {
		data: todos,
		getData: getTodos,
		loading
	} = useGetTodos()

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
				<Button variant="primary" onClick={() => getTodos()}>Refresh</Button>
			</div>

			<AddNewTodoForm onAddTodo={addTodo} />

			{loading && <p>Loading todos...</p>}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
