import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };
    console.log(isNavCollapsed)

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">📝 Better Todos</Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={handleNavCollapse}
                />

                <Navbar.Collapse id="basic-navbar-nav" className={`${isNavCollapsed ? 'collapse' : ''}`}>
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" onClick={handleNavCollapse}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/todos" onClick={handleNavCollapse}>
                            Todos
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
