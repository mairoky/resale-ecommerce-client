import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import './Header.css';


const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.error(error))
    }
    return (
        <header className='py-1'>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">ReBuy Bike</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`rebuy-nav-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`rebuy-nav-expand-${expand}`}
                            aria-labelledby={`rebuy-navLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`rebuy-navLabel-expand-${expand}`}>
                                    ReBuy Bike
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-dark">
                                        <FaSearch />
                                    </Button>
                                </Form>
                                <Nav>
                                    {
                                        !user?.uid ?
                                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                            :
                                            <NavDropdown
                                                title="Profile"
                                                id={`rebuy-navDropdown-expand-${expand}`}
                                            >
                                                <NavDropdown.Item as={Link} to="/dashboard">
                                                    Dashboard
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item as={Link}>
                                                    <button className='btn btn-dark' onClick={handleLogOut}>Logout</button>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                    }
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </header>
    );
};

export default Header;