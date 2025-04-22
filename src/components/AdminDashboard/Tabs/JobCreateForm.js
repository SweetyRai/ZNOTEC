import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

const JobCreateForm = ({ onJobCreated }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;
  const [formData, setFormData] = useState({
    title: '',
    company: 'ZNOTEC GmbH',
    description: '',
    qualification: '',
    location: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { title, description, qualification } = formData;
    return title.trim() && description.trim() && qualification.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ type: 'danger', text: 'Please fill all required fields.' });
      return;
    }

    try {
      const response = await axios.post(API_URL+'/api/admin/createJob', formData);

      setMessage({ type: 'success', text: 'Job created successfully!' });
      setFormData({
        title: '',
        company: 'ZNOTEC GmbH',
        description: '',
        qualification: '',
        location: ''
      });

      if (onJobCreated) onJobCreated();

    } catch (error) {
      setMessage({ type: 'danger', text: 'Error creating job. Try again.' });
    }
  };

  return (
    <Form className="p-3 border rounded shadow-sm bg-white" onSubmit={handleSubmit}>
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Job Title *</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter company name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Qualification *</Form.Label>
        <Form.Control
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Enter qualification requirements"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location (optional)"
        />
      </Form.Group>

      <Button type="submit" variant="success">Submit</Button>
    </Form>
  );
};

export default JobCreateForm;
