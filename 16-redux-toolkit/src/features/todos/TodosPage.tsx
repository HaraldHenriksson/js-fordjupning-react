import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { TodoFormData } from "../../types/Todo.types";
import { toast } from "react-toastify";
import TodoForm from "./TodoForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleAddTodo, handleDelete, handleToggle } from "./todosSlice";

const TodosPage = () => {
	const dispatch = useAppDispatch(); // Get the dispatch function
	const todos = useAppSelector(state => state.todos); // Get the todos from the Redux store

	const onAddTodo = async (data: TodoFormData) => {
		dispatch(handleAddTodo(data)); // Dispatch the handleAddTodo action
		toast.success("Yay, even MORE stuff to do... 😁");
	}

	const onToggle = async (id: string) => {
		dispatch(handleToggle(id)); // Dispatch the handleToggle action
		toast.success("Yay, you did something... 😁");
	}

	const onDelete = async (id: string) => {
		dispatch(handleDelete(id)); // Dispatch the handleDelete action
		toast.success("Deleting stuff instead of doing them still counts... 🏆");
	}

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={onAddTodo} /> {/* Updated to use onAddTodo */}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							key={todo.id}
							className={todo.completed ? "done" : ""}
						>
							<span className="todo-title">{todo.title}</span>
							<ButtonGroup>
								<Button
									variant="outline-success"
									size="sm"
									onClick={() => onToggle(todo.id)}
								>
									{todo.completed ? "Undo" : "Done"}
								</Button>
								<Button
									variant="outline-danger"
									size="sm"
									onClick={() => onDelete(todo.id)}
								>
									Delete
								</Button>
							</ButtonGroup>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</Container>
	)
}

export default TodosPage;
