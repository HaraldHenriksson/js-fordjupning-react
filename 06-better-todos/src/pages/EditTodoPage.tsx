// EditTodoPage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import AddNewTodoForm from '../components/AddNewTodoForm'
import { Todo } from '../types'

const EditTodoPage = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState<Todo | null>(null)

    useEffect(() => {

        const fetchTodo = async () => {

            const fetchedTodo = await TodosAPI.getTodo(Number(id))
            setTodo(fetchedTodo)
        }

        fetchTodo()
    }, [id])

    const handleEditTodo = async (updatedTodo: Todo) => {

        await TodosAPI.updateTodo(Number(id), updatedTodo)

    }

    if (!todo) {
        return <p>Loading...</p>
    }

    return (
        <AddNewTodoForm initialData={todo} onAddTodo={handleEditTodo} />
    )
}

export default EditTodoPage
