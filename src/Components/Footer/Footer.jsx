import React from 'react'
import './Footer.scss'
import { useNavigate } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-light py-4'>
            <Container fluid>
                <Row className='d-flex justify-content-between text-center text-md-start'>
                    {/* Company Info */}
                    <Col xs={12} md={4} className='mb-4 mb-md-0'>
                        <h1 className='mt-2'>MEALMATE</h1>
                        <h4 className='py-3 fs-5' style={{ fontFamily: 'Times' }}>
                            In the new era of technology we look a in the future with certainty and pride to for our company.
                        </h4>
                    </Col>

                    {/* Navigation Buttons */}
                    <Col xs={12} md={4} className='mb-4 mb-md-0 my-auto'>
                        <Row className='Footer-btn mt-2 d-flex flex-column align-items-center'>
                            <button className="btn w-75" onClick={() => navigate('/')}>Home</button>
                            <button className="btn w-75" onClick={() => navigate('/about')}>About</button>
                            <button className="btn w-75" onClick={() => navigate('/product')}>Menu</button>
                            <button className="btn w-75" onClick={() => navigate('/contact')}>Contact</button>
                        </Row>
                    </Col>


                    {/* Address */}
                    <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-start mt-2">
                        <Row className='address'>
                            <p className='text-muted text-center text-md-start m-0'>
                                xxxxxxx,<br />
                                yyyyyyyyy,<br />
                                zzzzzzzzzzzzz,<br />
                                +91 9876543210
                            </p>
                        </Row>
                    </Col>

                </Row>

                <hr />

                {/* Social Icons */}
                <Row>
                    <Col className='icons d-flex justify-content-center justify-content-md-center align-items-center gap-3 gap-md-4 mt-3'>
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Footer;
