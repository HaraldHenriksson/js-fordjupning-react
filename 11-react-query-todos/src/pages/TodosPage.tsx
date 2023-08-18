import { Todo } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import * as TodosAPI from '../services/TodosAPI'
import { useQuery } from '@tanstack/react-query'

const TodosPage = () => {
	const location = useLocation()
	const [searchParams, _setSearchParams] = useSearchParams()
	const searchParams_deletedTodo = searchParams.get("deleted")
	const deletedTodo = Boolean(searchParams_deletedTodo)

	const { data: todos, refetch } = useQuery({
		queryKey: ['get-todos'],
		queryFn: () => TodosAPI.getTodos()
	})

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		await TodosAPI.createTodo(todo)
		refetch()
	}

	if (todos) {

		todos?.sort((a, b) => a.title.localeCompare(b.title))

		// sort by completed status
		todos?.sort((a, b) => Number(a.completed) - Number(b.completed))

	}



	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
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
