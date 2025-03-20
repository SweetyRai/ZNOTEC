import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import './Contact.css';

const Contact = () => {
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.fade-section').forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page">
      <Navbar className={'contact-navbar'}/> 
      <div className="contact-container">
        {/* Contact Header */}
        <section className="contact-header contact-fade-section">
          <Container className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Contact us
            </motion.h1>
            <p className='text-dark'>We’re SAP and IT solution enthusiasts eager to get your problems solved.</p>
          </Container>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info contact-fade-section">
          <Container>
            <Row className="gy-4">
              {/* Office Location */}
              <Col md={4}>
                <motion.div className="contact-box" whileHover={{ scale: 1.05 }}>
                  <div className="icon-box">📍</div>
                  <h5>Visit Our Office (Berlin)</h5>
                  <p><strong>Street:</strong> Pichelorferstr Str 61, 13595</p>
                  <p><strong>City:</strong> Berlin</p>
                  <p><strong>Country:</strong> Germany</p>
                </motion.div>
              </Col>

              {/* Contact Details */}
              <Col md={4}>
                <motion.div className="contact-box" whileHover={{ scale: 1.05 }}>
                  <div className="icon-box">📞</div>
                  <h5>Quick Contact</h5>
                  <p><strong>Phone:</strong> <a href="tel:+493035305602">+4930 35305602</a></p>
                  <p><a href="tel:+493035305604">+4930 35305604</a></p>
                  <p><strong>Email:</strong> <a href="mailto:info@ZNOTEC.com">info@ZNOTEC.com</a></p>
                </motion.div>
              </Col>

              {/* Working Hours */}
              <Col md={4}>
                <motion.div className="contact-box" whileHover={{ scale: 1.05 }}>
                  <div className="icon-box">⏳</div>
                  <h5>Working Hours</h5>
                  <p><strong>Monday – Friday:</strong> 8.00am to 5.00pm</p>
                  <p><strong>Saturday:</strong> We are Closed</p>
                  <p><strong>Sunday:</strong> We are Closed</p>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

      
      </div>
    </div>
  );
};

export default Contact;
