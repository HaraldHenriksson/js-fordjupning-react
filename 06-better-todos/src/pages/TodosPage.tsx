import { useEffect, useState } from 'react'
import { Todos } from '../types'
import { ListGroup } from 'react-bootstrap'
// import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import SortTodos from '../components/SortTodos'

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
    // const addTodo = async (todo: Todo) => {
    //     await TodosAPI.createTodo(todo)
    //     getTodos()
    // }

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

    const handleSortChange = (selectedOption: string) => {
        setTodos(prevTodos => {
            const sortedTodos = [...prevTodos].sort((a, b) => {
                if (selectedOption === 'completedFirst') {
                    return a.completed === b.completed ? 0 : a.completed ? -1 : 1
                } else if (selectedOption === 'notCompletedFirst') {
                    return a.completed === b.completed ? 0 : a.completed ? 1 : -1
                } else {
                    return a.title.localeCompare(b.title)
                }
            })

            return sortedTodos
        })
    }

    return (
        <>

            {showAlert && location.state?.message && <Alert variant='success'>{location.state.message}</Alert>}

            {/* <AddNewTodoForm onAddTodo={addTodo} /> */}

            <SortTodos handleSortChange={handleSortChange}></SortTodos>

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