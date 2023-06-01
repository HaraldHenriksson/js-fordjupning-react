// EditTodoPage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import AddNewTodoForm from '../components/AddNewTodoForm'
import { Todo } from '../types'

const EditTodoPage = () => {
    const { id: idParam } = useParams()
    const id = Number(idParam)
    const [todo, setTodo] = useState<Todo | null>(null)

    useEffect(() => {
        const fetchTodo = async () => {
            if (isNaN(id)) {
                // Handle the case where id is not a number
                return
            }

            const fetchedTodo = await TodosAPI.getTodo(id)
            setTodo(fetchedTodo)
        }

        fetchTodo()
    }, [id])

    const handleEditTodo = async (updatedTodo: Todo) => {
        if (!isNaN(id)) {
            await TodosAPI.updateTodo(id, updatedTodo)
            // handle navigation or other actions after editing the todo
        }
    }

    if (!todo) {
        return <p>Loading...</p>
    }

    return (
        <AddNewTodoForm initialData={todo} onAddTodo={handleEditTodo} />
    )
}

export default EditTodoPage
