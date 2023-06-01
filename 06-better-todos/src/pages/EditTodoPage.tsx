// EditTodoPage.tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import AddNewTodoForm from '../components/AddNewTodoForm'
import { Todo } from '../types'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const EditTodoPage = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState<Todo | null>(null)
    const [success, setSuccess] = useState<boolean | null>(null)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchTodo = async () => {

            const fetchedTodo = await TodosAPI.getTodo(Number(id))
            setTodo(fetchedTodo)
        }

        fetchTodo()
    }, [id])

    const handleEditTodo = async (updatedTodo: Todo) => {

        try {
            await TodosAPI.updateTodo(Number(id), updatedTodo)

            setTimeout(() => {
                navigate(`/todos/${id}`)
            }, 2000)

            setSuccess(!!updatedTodo)

        } catch (err) {
            setSuccess(false)
        }

    }

    if (!todo) {
        return <p>Loading...</p>
    }

    return (
        <>
            {success === true && (
                <Alert variant="success" className="mt-3">Todo edited!</Alert>
            )}

            {success === false && (
                <Alert variant="warning" className="mt-3">Todo could not be edited 😔</Alert>
            )}

            <AddNewTodoForm initialData={todo} onAddTodo={handleEditTodo} />

            <Link to={`/todos/${id}`}>
                <Button variant='secondary'>&laquo; Back</Button>
            </Link>
        </>
    )
}

export default EditTodoPage
