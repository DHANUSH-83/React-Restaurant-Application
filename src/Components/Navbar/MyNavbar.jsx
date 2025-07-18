import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { FaShoppingCart } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartContext } from '../../Context/CartProvider';
import { IoFastFoodSharp } from "react-icons/io5";

const MyNavbar = () => {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar expand="md" className="navbar tertiary sticky-top ">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand fs-md-2 fs-sm-4">
          <IoFastFoodSharp /> MEALMATE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="navbar-nav justify-content-end flex-grow-1 text-center gap-3 ">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
              <Nav.Link as={Link} to="/product" className="nav-link">Menu</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
              <Nav.Link as={Link} to="/cart" className="nav-link position-relative">
                <FaShoppingCart className="nav-cart-icon" />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize:'10px'}}>
                    {totalItems}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
