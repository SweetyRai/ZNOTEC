import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file
import React, { useState, useEffect } from "react";

export default function NavigationBar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  // Function to change navbar class on scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar-blur custom-navbar ${scrolled ? "scrolled" : ""} ${isMobile ? "bg-light" : ""} custom-navbar ${className}` }
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/logo.png" alt="ZNOTEC GmbH" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/career">Career</Nav.Link>
            <Nav.Link as={Link} to="/b2b">B2B</Nav.Link>
            <Nav.Link as={Link} to="/freelancer">Freelancer</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
