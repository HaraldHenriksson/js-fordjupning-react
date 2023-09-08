import { CollectionReference, QueryConstraint, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useStreamCollection  = <T>(
    colRef: CollectionReference<T>,
    ...QueryConstraint: QueryConstraint[]
    ) => {
	const [data, setData] = useState<T[]|null>(null)
	const [loading, setLoading] = useState(true)

	// Get data on component mount
	useEffect(() => {
        // construct a query reference 
        const queryRef = query(colRef, ...QueryConstraint)
        
        // Subscribe to the changes in the collection
        const unsubscribe = onSnapshot(queryRef , (snapshot) => {
            // loop over all docs
            const data: T[] = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    _id: doc.id,
                }
            })

            setData(data)
            setLoading(false)
        })
		
        // return unsubscribe function as cleanup
        return unsubscribe
	}, [colRef])

	return {
		data,
		loading,
	}
}

export default useStreamCollection 
