import { createContext, useState } from 'react'

type ThemeContextType = {
    isDarkMode: boolean
    toggleTheme: () => void
}

// This creates the actual context and sets the context's initial/default value
export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {
        // we can provide a "default" implementation that throws an error if
        // trying to use `toggleTheme()` outside of context
        throw new Error("Trying to use toggleTheme outside of context")
    }
})

interface IProps {
    children: React.ReactNode
}

// This allows us to wrap <App /> and provide the theme to our children and grandchildren etc.
const ThemeProvider: React.FC<IProps> = ({ children }) => {
    const [isDarkMode, setisDarkMode] = useState<boolean>(false)

    const toggleTheme = () => {
        setisDarkMode(!isDarkMode)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
