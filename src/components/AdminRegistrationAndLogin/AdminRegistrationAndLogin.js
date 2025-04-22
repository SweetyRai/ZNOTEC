import React, { useState } from 'react';
import './AdminRegistrationAndLogin.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';



const AdminRegistrationAndLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const endpoint = isRegistering ? '/admin/register' : '/admin/login';
    const payload = isRegistering
      ? { email, phone, password }
      : { email, password };
  
    try {
      const res = await fetch(`http://localhost:8001/public/api/v0${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.msg || 'Something went wrong');
      } else {
        setSuccess(data.msg || 'Success');
        if (isRegistering) {
          resetForm();
          setTimeout(() => setSuccess(''), 3000); // clear success message after a few seconds
        } else if (data.token) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminData', JSON.stringify(data.admin));
          dispatch(setAdmin({ admin: data.admin, token: data.token }));
          navigate('/admin-dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };
  
  

  return (
    <div className="admin-auth-wrapper">
      <div className="admin-auth-card">
        <h2 className="admin-auth-title">{isRegistering ? 'Admin Registration' : 'Admin Login'}</h2>

        {error && <div className="admin-auth-error">{error}</div>}
        {success && <div className="admin-auth-success">{success}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="admin-auth-form-group">
            <Form.Control
              className="admin-auth-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {isRegistering && (
            <>
              <Form.Group className="admin-auth-form-group">
                <Form.Control
                  className="admin-auth-input"
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="admin-auth-form-group">
                <Form.Control
                  className="admin-auth-input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="admin-auth-form-group">
                <Form.Control
                  className="admin-auth-input"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}

          {!isRegistering && (
            <Form.Group className="admin-auth-form-group">
              <Form.Control
                className="admin-auth-input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Button type="submit" className="admin-auth-button">
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </Form>

        <div className="admin-auth-switch">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <a href="#" onClick={() => setIsRegistering(false)}>
                Login
              </a>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <a href="#" onClick={() => setIsRegistering(true)}>
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationAndLogin;
