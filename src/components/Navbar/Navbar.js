import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../../redux/userSlice";

export default function NavigationBar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 991);

    const localUser = localStorage.getItem('user');
    const localToken = localStorage.getItem('token');

    if (localUser && localToken && !isAuthenticated) {
      dispatch(setUser({ user: JSON.parse(localUser), token: localToken }));
    }

    const handleStorageChange = (event) => {
      if (event.key === 'user' || event.key === 'token') {
        const updatedUser = JSON.parse(localStorage.getItem('user'));
        const updatedToken = localStorage.getItem('token');

        if (updatedUser && updatedToken) {
          dispatch(setUser({ user: updatedUser, token: updatedToken }));
        } else {
          dispatch(logoutUser());
          navigate('/sign_in');
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("persist:root");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/sign_in");
    window.location.reload();
  };

  // 🔥 Important: if user is logged in, and currently on "/sign_in" page, redirect to dashboard
  useEffect(() => {
    if ((user && isAuthenticated) && location.pathname === '/sign_in') {
      navigate('/dashboard/dashboard');
    }
  }, [user, isAuthenticated, location.pathname, navigate]);

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
                <NavDropdown.Item as={Link} to="/dashboard">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              location.pathname !== '/sign_in' && (
                <Nav.Link as={Link} to="/sign_in" id="sign_in_nav">
                  Sign In
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
