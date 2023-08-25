import { useQuery } from '@tanstack/react-query'
import { getTodo as TodosAPI_getTodo } from '../services/TodosAPI'

const useTodo = ( todoId: number ) => {
	return useQuery(["todo", { id: todoId }], () => TodosAPI_getTodo(todoId))
}

export default useTodo
