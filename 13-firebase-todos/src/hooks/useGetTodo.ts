import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'

const useGetTodo = (documentId: string) => {
	const [data, setData] = useState<Todo|null>(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	// Get todo
	const getData = async (documentId: string) => {
		setError(false)
		setLoading(true)

		// get reference to document in `todos` collection
		const docRef = doc(todosCol, documentId)
		const docSnapshot = await getDoc(docRef)

		if (!docSnapshot.exists()) {
			setData(null)
			setError(true)
			setLoading(false)
			return
		}

		const data: Todo = {
			...docSnapshot.data(),
			_id: docSnapshot.id,
		}

		setData(data)
		setLoading(false)
	}

	// Get data on component mount
	useEffect(() => {
		getData(documentId)
	}, [documentId])

	return {
		data,
		error,
		getData,
		loading,
	}
}

export default useGetTodo
