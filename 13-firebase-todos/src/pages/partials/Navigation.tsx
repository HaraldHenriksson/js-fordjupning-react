import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navigation = () => {
	const { logout } = useAuth()

	const handleLogout = async () => {
		try {
			await logout()
			// navigate('/login');
		} catch (error) {
			console.error("Failed to log out:", error)
		}
	}

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
						<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
						<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
