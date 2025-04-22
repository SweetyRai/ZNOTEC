import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../redux/adminSlice'; // Make sure this action is defined in your Redux slice
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector(state => state.admin);

  console.log('Admin:', admin);
  console.log('Authenticated:', isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem('adminToken');
    navigate('/admin_sign_in');
  };

  const getAdminName = (email) => {
    return email?.split('@')[0]; // Returns "admin" from "admin@znotec.com"
  };
  

  return (
    <Navbar bg="light" expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/admin-dashboard">
          <img src="/logo.png" alt="ZNOTEC Admin" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
          <Nav>
          <Nav>
            {isAuthenticated && admin ? (
                <NavDropdown title={`Hi, ${getAdminName(admin?.email)}`} id="admin-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin-dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            ) : (
                <Button as={Link} to="/admin_sign_in" variant="primary">Sign In</Button>
            )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
