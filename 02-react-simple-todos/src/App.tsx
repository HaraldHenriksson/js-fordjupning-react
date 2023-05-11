import { useState } from 'react'
import { Todo, TodoList } from './types'
import './assets/scss/App.scss'
import TodoListItem from './components/TodoListitem'
import TodoCounter from './components/TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'

function App() {
	const [todos, setTodos] = useState<TodoList>([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])
	const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// create a new todo and set a new todos state
		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}
		setTodos([...todos, newTodo])

		// clear newTodoTitle state
		setNewTodoTitle("")
	}

	const deleteTodo = (todoToDelete: Todo) => {
		// set a new list of todos where the clicked todo is excluded
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const toggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	const addTodo = (newTodo: Todo) => {
		setTodos([...todos, newTodo]);
	  }

	return (
		<div className='container'>

		<h1 className="mb-3">React Simple Todos</h1>
		<AddNewTodoForm addTodo={addTodo}/>

			{todos.length > 0 && (
				<>
					<ul className="todolist">
						{unfinishedTodos.map((todo, index) => (
							<TodoListItem 
							onToggle={toggleTodo}
							onDelete={deleteTodo}
							todo={todo} 
							key={index}
						 />
						) )}
					</ul>

					<ul className="todolist">
						{finishedTodos.map((todo, index) => (
							<TodoListItem 
							onToggle={toggleTodo}
							onDelete={deleteTodo}
							todo={todo} 
							key={index}
						 />
						) )}
					</ul>
							<TodoCounter finishedTodos={finishedTodos.length} todos={todos.length}/>
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</div>
	)
}

export default App
