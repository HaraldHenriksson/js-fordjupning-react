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
    reloadUser: () => Promise<void>
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
            }
            setIsAuthDetermined(false)
        })

        // Clean up the observer on component unmount
        return unsubscribe
    }, [])

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
        if (currentUser) {
            await currentUser.reload()
            setCurrentUser(auth.currentUser)
            setUserEmail(auth.currentUser?.email || null)
        }
    }

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email, {
            url: window.location.origin + "/login"
        })
    }

    const setEmail = async (email: string) => {
        if (currentUser) {
            await updateEmail(currentUser, email)
            await reloadUser()
        }
    }

    const setPassword = async (password: string) => {
        if (currentUser) {
            await updatePassword(currentUser, password)
        }
    }

    const setDisplayName = async (name: string) => {
        if (currentUser && name !== currentUser.displayName) {
            await updateProfile(currentUser, { displayName: name })
            await reloadUser()
        }
    }

    const setPhotoUrl = async (url: string) => {
        if (currentUser && url !== currentUser.photoURL) {
            await updateProfile(currentUser, { photoURL: url })
            await reloadUser()
        }
    }

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