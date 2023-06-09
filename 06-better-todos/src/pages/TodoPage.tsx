import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import TodoListItem from '../components/TodoListItem'
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {

    const { id } = useParams()
    const todoId = Number(id)
    const [todo, setTodo] = useState<Todo | null>(null)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    // Get todo from API
    const getTodo = async (id: number) => {
        // call TodosAPI
        const data = await TodosAPI.getTodo(id)

        // update todo state with data
        setTodo(data)
    }

    useEffect(() => {
        if (typeof todoId !== "number") {
            return
        }
        getTodo(todoId)
    }, [todoId])

    const onToggle = async (todoToToggle: Todo) => {
        try {
            // Toggle todo in the backend API
            const updatedTodo = await TodosAPI.toggleTodo({
                ...todoToToggle,
                completed: !todoToToggle.completed,
            });



            // Update the todo in state
            setTodo(updatedTodo);
        } catch (error) {
            console.log('Error toggling todo', error);
        }
    };

    const handleDelete = async (todoToDelete: Todo) => {
        try {
            if (todoToDelete.id === undefined) {
                return;
            }

            // Delete todo in the backend API
            await TodosAPI.deleteTodo(todoToDelete.id);

            // Remove the todo from state
            setTodo(null);

            navigate('/todos', { state: { message: 'Todo deleted successfully' }, replace: true })
        } catch (error) {
            console.log('Error deleting todo', error);
        }
    }

    if (!todo) {
        return (<p>Loading...</p>)
    }

    return (
        <>
            <h1>{todo.title}</h1>

            <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

            <TodoListItem todo={todo} onDelete={() => setShowModal(true)} onToggle={onToggle} />

            <Link to={'/todos'}>
                <Button variant='secondary'>&laquo; All todos</Button>
            </Link>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(todo)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TodoPage