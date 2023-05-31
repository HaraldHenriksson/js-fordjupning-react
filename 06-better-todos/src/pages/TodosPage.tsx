import { useEffect, useState } from 'react'
import { Todo, Todos } from '../types'
import { ListGroup } from 'react-bootstrap'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

const TodosPage = () => {
    const location = useLocation();
    const [todos, setTodos] = useState<Todos>([])
    const [showAlert, setShowAlert] = useState(true)

    // Get todos from api
    const getTodos = async () => {
        const data = await TodosAPI.getTodos()
        setTodos(data)
    }

    // Create a new todo in the API
    const addTodo = async (todo: Todo) => {
        await TodosAPI.createTodo(todo)
        getTodos()
    }

    // fetch todos when App is being mounted
    useEffect(() => {
        getTodos()
    }, [])

    useEffect(() => {
        if (location.state?.message) {
            const timer = setTimeout(() => {
                setShowAlert(false)
            }, 2000)

            // Clean up function
            return () => clearTimeout(timer)
        }
    }, [location])

    return (
        <>

            {showAlert && location.state?.message && <Alert variant='success'>{location.state.message}</Alert>}

            <AddNewTodoForm onAddTodo={addTodo} />

            {todos.length > 0 && (
                <>
                    <ListGroup className='todolist'>
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
                </>
            )}

            {todos.length === 0 && (
                <p>Yayyy, you have 0 todos to do</p>
            )}
        </>

    )
}

export default TodosPage