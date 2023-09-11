import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>
    userEmail: string | null
    currentUser: User | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
    children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [userEmail, _setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        // Set up the authentication state observer
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                _setUserEmail(user.email)
                // You can also set other user properties if needed
            } else {
                // User is logged out
                _setUserEmail(null)
            }
        })

        // Clean up the observer on component unmount
        return () => unsubscribe()
    }, [])

    const signup = async (email: string, password: string) => {
        console.log("Whould signup use from AuthContext", email, password)

        // Sign up user in Firebase Auth
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email: string, password: string) => {
        console.log("Would login user from AuthContext", email, password)

        // Login user in Firebase Auth
        return await signInWithEmailAndPassword(auth, email, password)
    }

    return <AuthContext.Provider value={{
        signup,
        login,
        userEmail,
        currentUser: auth.currentUser,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider