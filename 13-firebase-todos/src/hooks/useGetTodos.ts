import { useEffect, useState } from 'react'
import { Todo, Todos } from '../types/Todo.types'
import { getDocs } from 'firebase/firestore'
import { todosCol } from '../services/firebase'

const useGetTodos = () => {
  const [todos, setTodos] = useState<Todos | null>(null)
  const [loading, setLoading] = useState(true)

    const fetchData = async () => {
      setLoading(true)

      const snapshot = await getDocs(todosCol)

      const data: Todos = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          _id: doc.id,
        } as Todo
      })

      setTodos(data)
      setLoading(false)
    }

    useEffect(() => {
    fetchData()
  }, [])

  return {
    todos,
    fetchData,
    loading,
  }
}

export default useGetTodos
