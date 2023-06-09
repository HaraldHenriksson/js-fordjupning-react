import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../Contexts/ThemeProvider'
import { Button } from 'react-bootstrap'

const Navigation = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    const handleToggleTheme = () => {
        if (toggleTheme) {
            toggleTheme()
        }
    }
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/chuck-norris">💪🏻 Random Chuck</Nav.Link>
                        <Nav.Link as={NavLink} to="/random-dog">🐶 Random dog</Nav.Link>
                        <Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
                        <Button variant='outline-secondary' onClick={handleToggleTheme}>{isDarkMode ? '☀️' : '🌙'} </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
