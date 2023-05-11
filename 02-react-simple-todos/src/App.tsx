import { useState } from 'react'
import { Todo, TodoList as TodoListType } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'
import TodoList from './components/TodoList'

function App() {
	const [todos, setTodos] = useState<TodoListType>([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])

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
				<TodoList todos={unfinishedTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
				<TodoList todos={finishedTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
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
