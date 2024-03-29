import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, onAuthStateChanged, signOut, sendPasswordResetEmail, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import SyncLoader from 'react-spinners/SyncLoader'

type AuthContextType = {
    isAuthDetermined: boolean
    currentUser: User | null
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    signup: (email: string, password: string) => Promise<UserCredential>
    reloadUser: () => Promise<boolean>
    resetPassword: (email: string) => Promise<void>
    setEmail: (email: string) => Promise<void>
    setDisplayName: (name: string) => Promise<void>
    setPassword: (password: string) => Promise<void>
    setPhotoUrl: (url: string) => Promise<void>
    userEmail: string | null
    userName: string | null
    userPhotoUrl: string | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
    children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [isAuthDetermined, setIsAuthDetermined] = useState(true)
    const [userName, setUserName] = useState<string | null>(null)
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

    const signup = (email: string, password: string) => {

        // Sign up user in Firebase Auth
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email: string, password: string) => {
        // Login user in Firebase Auth
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        await signOut(auth)
    }

    const reloadUser = async () => {
        if (!auth.currentUser) {
            return false
        }

        // Ask Firebase to reload the current user
        // await reload(auth.currentUser)

        // This will set currentUser to what it already is,
        // hence it will not trigger a state update nor a re-render
        // setCurrentUser(auth.currentUser)

        // We instead update our "derived" states
        setUserName(auth.currentUser.displayName)
        setUserEmail(auth.currentUser.email)
        setUserPhotoUrl(auth.currentUser.photoURL)

        return true
    }

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email, {
            url: window.location.origin + "/login",
        })
    }

    const setEmail = (email: string) => {
        if (!currentUser) { throw new Error("Current User is null!") }
        return updateEmail(currentUser, email)
    }

    const setPassword = (password: string) => {
        if (!currentUser) { throw new Error("Current User is null!") }
        return updatePassword(currentUser, password)
    }

    const setDisplayName = (displayName: string) => {
        if (!currentUser) { throw new Error("Current User is null!") }
        return updateProfile(currentUser, { displayName })
    }

    const setPhotoUrl = (photoURL: string) => {
        if (!currentUser) { throw new Error("Current User is null!") }
        return updateProfile(currentUser, { photoURL })
    }

    useEffect(() => {
        // Set up the authentication state observer
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            if (user) {
                if (!auth.currentUser) {
                    return
                }

                // User is logged in
                setUserName(auth.currentUser.displayName)
                setUserEmail(auth.currentUser.email)
                setUserPhotoUrl(auth.currentUser.photoURL)

            } else {
                // User is logged out
                setUserEmail(null)
                setUserName(null)
                setUserPhotoUrl(null)
            }
            setIsAuthDetermined(false)
        })

        // Clean up the observer on component unmount
        return unsubscribe
    }, [])

    return <AuthContext.Provider value={{
        signup,
        login,
        logout,
        userEmail,
        currentUser,
        isAuthDetermined,
        reloadUser,
        resetPassword,
        setEmail,
        setPassword,
        setDisplayName,
        setPhotoUrl,
        userName,
        userPhotoUrl
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