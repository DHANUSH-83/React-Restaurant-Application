import React from 'react'
import Navbar from '../Components/Navbar/MyNavbar'
import Footer from '../Components/Footer/Footer'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { Homebanner, testimonial } from '../Data/Data'
import food2 from '../assets/food2.jpg'
import video from '../assets/video.mp4'

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-light  fluid'>
              <Container fluid className='px-4 mt-2 mb-4'>
                <Row className="align-items-center">
                  {Homebanner.map((item, id) => (
                    <React.Fragment key={id}>
                      <Col xs={12} md={6} className="position-relative mb-4 mt-4">
                        <img
                          className="img-fluid d-block mx-auto"
                          src={food2}
                          alt=""
                          style={{
                            height: 'auto',
                            maxHeight: '550px',
                            width: '100%',
                            borderRadius: '20px',
                          }}
                        />
                      </Col>
      
                      <Col xs={12} md={6} className="text-md-start mt-n3 px-5">
                        <h1 className=" py-3 text-start fs-3" style={{ fontFamily: 'Times' }}>
                          {item.title.split(' ').slice(0, 3).join(' ')} <br />
                          {item.title.split(' ').slice(3).join(' ')}
      
                        </h1>
                        <p className="fs-5  text-start text-muted ">{item.des1}</p>
                        <p className="fs-6 text-muted text-start">{item.des2}</p>
                        <button className="btn" style={{ border: '1px solid', borderRadius: '20px' }} onClick={() => navigate('/about')}>More About Us</button>
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>
              </Container>
            </div>
      <div className="container my-4">

        <div className="w-100 h-75 ratio ratio-16x9">
          <video controls muted autoPlay className="border border-dark rounded">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <Container className="my-5">
        <Row>
          {testimonial.map((item, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="p-3 h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>"{item.title}"</Card.Title>
                  <Card.Text>{item.des}</Card.Text>
                  <hr />
                  <h5 className="fw-bold mb-0">{item.name}</h5>
                  <h6 className="text-muted">{item.location}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </div>
  )
}

export default About