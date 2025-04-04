import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";

export default function NavigationBar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Scroll effect
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  // Responsive effect
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/sign_in");
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
      fixed="top"
      className={`navbar-blur custom-navbar ${scrolled ? "scrolled" : ""} ${isMobile ? "bg-light" : ""} ${className || ""}`}
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

            {isAuthenticated && user ? (
              <NavDropdown title={`Hi, ${user.first_name}`} id="user-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/sign_in" id="sign_in_nav">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
