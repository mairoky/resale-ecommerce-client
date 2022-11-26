import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import './Header.css';


const Header = () => {
    return (
        <header className='py-1'>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">ReBuy Store</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`rebuy-nav-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`rebuy-nav-expand-${expand}`}
                            aria-labelledby={`rebuy-navLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`rebuy-navLabel-expand-${expand}`}>
                                    ReBuy Store
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
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                    <NavDropdown
                                        title="Profile"
                                        id={`rebuy-navDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item as={Link} to="/dashboard">
                                            Dashboard
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
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