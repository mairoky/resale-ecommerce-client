import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const DashboardHeader = () => {
    const { user, logOut } = useContext(AuthContext);
    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    return (
        <header className='py-1'>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">ReBuy Bike</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`rebuy-nav-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`rebuy-nav-expand-${expand}`}
                            aria-labelledby={`rebuy-navLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`rebuy-navLabel-expand-${expand}`}>
                                    ReBuy Bike
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                                    {
                                        !user?.uid ?
                                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                            :
                                            <Nav.Link as={NavLink} to="/login">
                                                <button className='btn btn-dark' onClick={handleLogOut}>Logout</button>
                                            </Nav.Link>

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

export default DashboardHeader;