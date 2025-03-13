import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./B2B.css";

const B2BPage = () => {
  return (
    <div className="b2b-page">
      {/* Hero Section */}
      <section className="b2b-hero">
        <div className="B2B-overlay">
          <h1 className="b2b-hero-title">
            Unlock Business Success with <span>Znotec</span>
          </h1>
          <p className="hero-description">
            Transform your business with our B2B solutions for SAP, Cloud, IT Consulting, and Enterprise Resource Planning.
          </p>
          <Button variant="primary" className="cta-button">
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              Get Started
            </Link>
          </Button>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="b2b-features">
        <Container>
          <h2 className="section-title">Our B2B Services</h2>
          <Row>
            {[
              { title: "SAP Managed Services", desc: "Optimize SAP systems with security & scalability.", icon: "🔧" },
              { title: "Cloud Solutions", desc: "Flexible & secure cloud computing for businesses.", icon: "☁️" },
              { title: "IT Consulting", desc: "Expert guidance for digital transformation.", icon: "💡" },
              { title: "Enterprise Resource Planning", desc: "Efficient business process management.", icon: "📊" },
            ].map((service, index) => (
              <Col key={index} md={6} lg={3}>
                <motion.div
                  className="feature-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="feature-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="b2b-testimonials">
        <Container>
          <h2 className="section-title">What Our Clients Say</h2>
          <Row>
            {[
              { name: "John Doe", company: "Tech Corp", review: "Znotec transformed our business operations!" },
              { name: "Jane Smith", company: "Finance Co.", review: "The best IT Consulting we've experienced." },
            ].map((testimonial, index) => (
              <Col key={index} md={6}>
                <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }}>
                  <p className="testimonial-text">"{testimonial.review}"</p>
                  <h5>{testimonial.name}</h5>
                  <span>{testimonial.company}</span>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="b2b-cta">
        <Container>
          <h2>Ready to scale your business?</h2>
          <Button variant="light" className="cta-button b2b-cta-button">
            <Link to="/contact" className="b2b-contact" style={{ textDecoration: 'none'}}>
              Get Started
            </Link>
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default B2BPage;
