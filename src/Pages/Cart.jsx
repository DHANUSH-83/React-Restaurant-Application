import React, { useContext } from 'react';
import { CartContext } from '../Context/CartProvider';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../Components/Navbar/MyNavbar';
import './Styles/Cart.scss'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const navigate=useNavigate()

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        {cartItems.length === 0 ? (
          <div className='d-flex flex-column justify-content-center align-items-center min-vh-50' >
          <h4 className="text-center text-danger">Cart is empty!</h4> 
          <button className='cart-btn mt-3' onClick={()=>navigate('/product')}>Back to Menu</button>
          </div>
        ) : (
          <Row className="g-4">
            {cartItems.map((item, index) => (
              <Col xs={12} md={4} lg={3} key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{item.strMeal}</Card.Title>
                    <Card.Text className="text-muted">{item.strCategory}</Card.Text>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <Button variant="outline-secondary" onClick={() => decreaseQuantity(item.idMeal)}>-</Button>
                      <span className="fw-bold">{item.quantity}</span>
                      <Button variant="outline-secondary" onClick={() => increaseQuantity(item.idMeal)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(item.idMeal)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Cart;
