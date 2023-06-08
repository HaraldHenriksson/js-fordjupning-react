import { useContext } from "react"
import { ThemeContext } from "../Contexts/ThemeProvider"

const useThemeContext = () => {
    return useContext(ThemeContext)
}

export default useThemeContext
