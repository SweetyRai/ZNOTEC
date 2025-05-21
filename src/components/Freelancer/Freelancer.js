import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './Freelancer.css';
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from 'react-bootstrap';
import RegistrationAndLogin from '../RegistrationAndLogin/RegistrationAndLogin';


const Freelancer = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };


  // Filter freelance projects by search term and location
  const filteredProjects = projects.filter(project => {
    const matchesTerm = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || project.category?.includes(categoryFilter);
    return matchesTerm && matchesCategory;
  });

  const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/private/api/projects/all`);
    const data = await res.json();
    setProjects(data);

    // Extract unique categories from data
    const categorySet = new Set();
    data.forEach(project => {
      if (Array.isArray(project.category)) {
        project.category.forEach(cat => categorySet.add(cat.trim()));
      }
    });
    setCategories(Array.from(categorySet).sort());
  } catch (err) {
    console.error('Error fetching projects:', err);
  }
};


  // Scroll Animation
  useEffect(() => {
    fetchProjects();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.freelance-fade-section').forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="freelancer-page">

      {/* Hero Section */}
      <div className="freelance-hero-section">
        <div className="freelance-hero-overlay">
          <h1 className="freelance-hero-title">Empower Your Career as a <span className='word'>Freelancer</span></h1>
        </div>
      </div>

      {/* Search Section */}
      <section className="freelancer-search freelance-fade-section">
        <Container>
          <h2 className="text-center section-title">Find Freelance Projects</h2>
          <Row className="search-row">
            <Col md={6}>
              <input 
                type="text" 
                className="form-control freelance-form-control form-control-lg" 
                placeholder="Search projects..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </Col>
            <Col md={4} className="mb-2">
              <select
                className="form-select form-select-lg"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="freelancer-projects freelance-fade-section">
        <Container>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className={`job-card mb-4 ${expandedId === project.id ? "expanded" : ""}`}>
                <div className="job-title-wrapper">
                  <h4 className="job-title">{project.title}</h4>
                </div>
                <Row>
                  <Col md={5} className="d-flex flex-column justify-content-center">
                    <p><strong>Category:</strong> {project.category}</p>
                    <p><strong>Technologies:</strong> {project.technologies}</p>
                    <h5 className="start-date">
                    <strong>Start Date:</strong>{' '}
                    {project.start_date ? new Date(project.start_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </h5>
                  </Col>
                  <Col md={7} className="description-col">
                    <p>
                      <strong>Description:</strong>{" "}
                      {expandedId === project.id ? project.description : `${project.description.substring(0, 150)}...`}
                      <a href="#" onClick={(e) => { e.preventDefault(); toggleExpand(project.id); }} style={{ color: "#007bff", textDecoration: "none" }}>
                        {expandedId === project.id ? " Learn Less" : " Learn More"}
                      </a>
                    </p>
                    {expandedId === project.id && (
                      <div className="mt-3">
                        <p><strong>Contact Email:</strong> <span style={{ color: "#007bff" }}>{project.email}</span></p>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <p className="text-center">No projects found matching your search criteria.</p>
          )}
        </Container>
      </section>

      {/* Call to Action */}
      <section className="freelancer-cta text-center text-white freelance-fade-section">
        <div className="container">
          <h2>Start Your Freelancing Journey Today</h2>
          <Button variant="primary" size="lg" className="hero-button">
            <Link to="/sign_in" style={{ textDecoration: 'none', color: 'white' }}>
            Join Now
            </Link>
          </Button>
        </div>
      </section>
      

    </div>
  );
};

export default Freelancer;
