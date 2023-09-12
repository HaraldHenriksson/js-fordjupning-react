import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import SyncLoader from 'react-spinners/SyncLoader'

type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    userEmail: string | null
    currentUser: User | null
    isAuthDetermined: boolean
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
    children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [_currentUser, setCurrentUser] = useState<User | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [isAuthDetermined, setIsAuthDetermined] = useState(true)

    useEffect(() => {
        // Set up the authentication state observer
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state determined:", user)
            setCurrentUser(user)
            if (user) {
                // User is logged in
                setUserEmail(user.email)

            } else {
                // User is logged out
                setUserEmail(null)
            }
            setIsAuthDetermined(false)
        })

        // Clean up the observer on component unmount
        return unsubscribe
    }, [])

    const signup = (email: string, password: string) => {
        console.log("Whould signup use from AuthContext", email, password)

        // Sign up user in Firebase Auth
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email: string, password: string) => {
        console.log("Would login user from AuthContext", email, password)

        // Login user in Firebase Auth
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        await signOut(auth)
    }

    return <AuthContext.Provider value={{
        signup,
        login,
        logout,
        userEmail,
        currentUser: auth.currentUser,
        isAuthDetermined
    }}>
        {isAuthDetermined ? (
            <div id="initial-loader">
                <SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
            </div>
        ) : (
            <>{children}</>
        )}
    </AuthContext.Provider>
}

export default AuthContextProvider