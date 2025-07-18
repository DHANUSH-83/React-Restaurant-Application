import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Context/CartProvider';
import '../Styles/Product.scss';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { Nav, Container, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import pg from '../assets/pg.jpeg'

const Product = () => {
  const location = useLocation();
  const selectedCategory = location.state?.category;

  const [categories, setCategories] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [active, setActive] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { addToCart } = useContext(CartContext);

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Set default or selected category when categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      const defaultCategory = selectedCategory || categories[0].strCategory;
      setActive(defaultCategory);
    }
  }, [categories, selectedCategory]);

  // Fetch meals for the active category
  useEffect(() => {
    if (active) {
      fetchMealsByCategory(active);
    }
  }, [active]);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const result = await res.json();
      setCategories(result.categories);
    } catch (err) {
      console.log('Categories Error', err);
    }
  };

  // Fetch meals from selected category
  const fetchMealsByCategory = async (category) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const result = await res.json();
      const mealsWithCategory = (result.meals || []).map(meal => ({
        ...meal,
        strCategory: category,
      }));
      setAllMeals(mealsWithCategory);
    } catch (err) {
      console.log('Fetch meals error:', err);
    }
  };

  // Open Modal
  const handleShow = async (item) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
      const result = await res.json();
      setSelectedProduct(result.meals[0]);
      setShow(true);
    } catch (err) {
      console.log('Error loading meal details:', err);
    }
  };

  // Close Modal
  const handleClose = () => {
    setSelectedProduct(null);
    setShow(false);
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
  };

  // Filter meals by category and search
  const filteredMeals = allMeals.filter(item => {
    const nameMatch = item.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = item.strCategory === active;

    return categoryMatch && (searchTerm.trim() === "" || nameMatch);
  });

  return (
    <div>
      <MyNavbar />

      {/* Search */}
      <Form className="d-flex justify-content-center mt-4 mb-2">
        <Form.Control
          type="search"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
      </Form>

    
      <Nav className="justify-content-center mt-3 gap-3" as="ul">
        {categories.slice(0, 12).map((item, index) => (
          <Nav.Item as="li" key={index}>
            <Nav.Link
              className={item.strCategory === active ? "active" : ""}
              onClick={() => {
                setActive(item.strCategory);
                setSearchTerm(""); 
              }}
            >
              {item.strCategory}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      
      <Container className="mt-4 pb-5">
        <Row className="g-4 justify-content-center">
          {filteredMeals.map((item, index) => (
            <Col xs={6} sm={6} md={4} lg={3} key={index}>
              <Card
                className="border-0 custom-card h-100"
                onClick={() => handleShow(item)}
              >
                <Card.Img
                  variant="top"
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className='fs-6 fw normal'>{item.strMeal}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredMeals.length === 0 && (
          <h4 className="text-center text-danger mt-4">No meals found.</h4>
        )}
      </Container>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="responsive-fullwidth-modal"
      >
        {!selectedProduct ? (
          <div className="text-center p-4">Loading...</div>
        ) : (() => {
          const Ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = selectedProduct[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== "") {
              Ingredients.push(ingredient);
            }
          }

          return (
            <>
              <Modal.Header closeButton>
                <Modal.Title className="fs-4 fw-normal text-muted">{selectedProduct.strMeal}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Row className="g-4 align-items-center">
           
                  <Col xs={12} md={6}>
                    <img
                      src={selectedProduct.strMealThumb}
                      alt={selectedProduct.strMeal}
                      className="img-fluid rounded w-100"
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                  </Col>

                
                  <Col xs={12} md={6}>
                    <p className="mb-2"><strong>Category:</strong> {selectedProduct.strCategory}</p>
                    <p className="mb-3"><strong>Ingredients:</strong> {Ingredients.join(", ")}</p>

                    <center>
                      <button className="button mb-3 mt-2" onClick={() => handleAddToCart(selectedProduct)}>
                        Add to Cart
                      </button>
                    </center>

                    <center>
                      <img
                        src={pg}
                        alt=""
                        className="img-fluid rounded"
                        style={{ height: '80px', width: 'auto' }}
                      />
                    </center>
                  </Col>
                </Row>
              </Modal.Body>
            </>
          );
        })()}
      </Modal>

    </div>
  );
};

export default Product;
