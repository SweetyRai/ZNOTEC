import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          {/* Logo & About Section */}
          <Col md={4} className="text-center text-md-start">
            <a href="/"><img src="/logo-footer.png" alt="ZNOTEC GmbH" className="footer-logo" /></a>
            <p>
            With our extensive knowledge of the SAP environment and our demonstrated industry and process expertise in manufacturing / production, logistics, trade, public administration, and social economy, we add value to the global collectiveness and to you our clients.
            </p>

            <h5>Registergericht:</h5>
            <p>Amtsgerichts Berlin Charlottenburg</p>
            <p>Registernummer: HRB 240268B</p>
            
          </Col>

          {/* Contact Info */}
          <Col md={4} className="footer-contact text-center text-md-start">
            <h5>Contact Us</h5>
            <p>Pichelfsdorferstr. 61, 13595 Berlin</p>
            <p>Tel: +493035305602 +493035305604</p>
            <p>Email: <a href="mailto:info@ZNOTEC.com">info@ZNOTEC.com</a></p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="footer-links text-center text-md-start">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/b2b">B2B</a></li>
              <li><a href="/career">Career</a></li>
              <li><a href="/freelancer">For Freelancers</a></li>
              <li><a href="/privacy_policy">Pricacy Policy</a></li>
              <li><a href="/terms_and_consition">Terms & conditions</a></li>
            </ul>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
              <Button className="btn-contact">Got a project? Contact us!</Button>
            </Link>
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;