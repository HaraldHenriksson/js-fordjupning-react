import { useEffect, useState } from 'react'

const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		// get value from localStorage and parse it from JSON
		const value = window.localStorage.getItem(key)

        return value
        ? JSON.parse(value)
        : defaultValue
	})

	useEffect(() => {
            // convert storedValue to JSON and save in localStorage
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        }, [key, storedValue])

        return [
        storedValue,
        setStoredValue,
        ]
}

        export default useLocalStorage
