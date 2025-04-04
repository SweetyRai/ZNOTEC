import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Navbar from '../Navbar/Navbar';
import './RegistrationAndLogin.css';

const RegistrationAndLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formType, setFormType] = useState('register');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'B2B',
    phone: '',
    message: '',
    country: 'Germany',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      role: 'B2B',
      phone: '',
      message: '',
      country: 'Germany',
      gender: '',
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (formType === 'register') {
      if (!formData.first_name || /\d/.test(formData.first_name)) errs.first_name = 'First name is required and must not contain numbers.';
      if (!formData.last_name || /\d/.test(formData.last_name)) errs.last_name = 'Last name is required and must not contain numbers.';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required.';
      if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters.';
      if (formData.password !== formData.confirm_password) errs.confirm_password = 'Passwords do not match.';
      if (!formData.country) errs.country = 'Country is required.';
      if (!formData.gender) errs.gender = 'Gender is required.';
    } else {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required.';
      if (!formData.password) errs.password = 'Password is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    if (formType === 'register') {
      try {
        const res = await fetch('http://localhost:8001/public/api/v0/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, confirm_password: undefined }),
        });

        const result = await res.json();
        setLoading(false);

        if (res.ok) {
          setSuccessMessage(result.message || 'Registered successfully!');
          resetForm();
          setTimeout(() => setSuccessMessage(''), 4000);
        } else {
          setErrors({ form: result.msg || 'Registration failed.' });
        }
      } catch (err) {
        console.error('Registration error:', err);
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch('http://localhost:8001/public/api/v0/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await res.json();
        setLoading(false);

        if (res.ok) {
          console.log(result)
          dispatch(setUser({ user: result.user, token: result.token }));
          navigate('/dashboard');
        } else {
          setErrors({ form: result.msg || 'Login failed.' });
        }
      } catch (err) {
        console.error('Login error:', err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-login-wrapper">
      <Navbar className={'contact-navbar'}/> 
      <Container fluid className="sign_in_form_row">
        <Row className="min-vh-100">
          <Col md={6} className="left-column p-0">
            <div className="image-overlay">
              <img src="/login.jpg" alt="Background" className="background-image" />
              <div className="overlay-text-login">
                <h2>Welcome to ZNOTEC</h2>
                <p>Empowering Freelancers, Job Seekers & Businesses</p>
              </div>
            </div>
          </Col>

          <Col md={6} className="form-column d-flex align-items-center justify-content-center">
            <motion.div className="form-container w-100 px-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="text-center mb-4">
                <Button variant={formType === 'register' ? 'primary-btn' : 'outline-primary'} onClick={() => { setFormType('register'); resetForm(); }}>Register</Button>
                <Button variant={formType === 'login' ? 'primary-btn' : 'outline-primary'} onClick={() => { setFormType('login'); resetForm(); }}>Login</Button>
              </div>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errors.form && <Alert variant="danger">{errors.form}</Alert>}

              <Form onSubmit={handleSubmit}>
                {formType === 'register' && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-2">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control name="first_name" value={formData.first_name} onChange={handleChange} isInvalid={!!errors.first_name} />
                          <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control name="last_name" value={formData.last_name} onChange={handleChange} isInvalid={!!errors.last_name} />
                          <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} isInvalid={!!errors.confirm_password} />
                      <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Role</Form.Label>
                      <Form.Select name="role" value={formData.role} onChange={handleChange}>
                        <option value="B2B">B2B</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="JobSeeker">JobSeeker</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Phone Number (Optional)</Form.Label>
                      <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Message (Optional)</Form.Label>
                      <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Country</Form.Label>
                      <Form.Control name="country" value={formData.country} onChange={handleChange} isInvalid={!!errors.country} />
                      <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!errors.gender}>
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {formType === 'login' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>
                  </>
                )}

                <div className="text-center mt-3">
                  <Button type="submit" variant="primary" size="lg" disabled={loading}>
                    {loading ? <><Spinner as="span" animation="border" size="sm" role="status" className="me-2" />Loading...</> : (formType === 'register' ? 'Register' : 'Login')}
                  </Button>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegistrationAndLogin;
