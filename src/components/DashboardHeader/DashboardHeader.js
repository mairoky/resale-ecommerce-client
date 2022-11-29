import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useCheckUserRole from '../../hooks/useCheckUserRole';

const DashboardHeader = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, isBuyer, isSeller] = useCheckUserRole(user?.email);
    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => { })
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
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`rebuy-navLabel-expand-${expand}`}>
                                    ReBuy Bike
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end align-items-center flex-grow-1">
                                    {
                                        isAdmin && <>
                                            <Nav.Link as={NavLink} to="/dashboard/all-sellers">All Sellers</Nav.Link>
                                            <Nav.Link as={NavLink} to="/dashboard/all-buyers">All Buyers</Nav.Link>
                                            <Nav.Link as={NavLink} to="/dashboard/reported-items">Reported Items</Nav.Link>
                                        </>
                                    }
                                    {
                                        isSeller && <>
                                            <Nav.Link as={NavLink} to="/dashboard/add-product">Add Product</Nav.Link>
                                            <Nav.Link as={NavLink} to="/dashboard/my-products">My Products</Nav.Link>
                                            <Nav.Link as={NavLink} to="/dashboard/my-buyers">My Buyers</Nav.Link>
                                        </>
                                    }
                                    {
                                        isBuyer && <>
                                            <Nav.Link as={NavLink} to="/dashboard/my-orders">My Orders</Nav.Link>
                                            <Nav.Link as={NavLink} to="/dashboard/my-wishlist">My Wishlist</Nav.Link>
                                        </>
                                    }
                                    {
                                        !user?.uid ?
                                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                            :
                                            <Nav.Link as={Link} to="/login">
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