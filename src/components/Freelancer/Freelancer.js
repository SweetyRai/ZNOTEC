import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import './Freelancer.css';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const Freelancer = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [modalMessage, setModalMessage] = useState('');
  const { user } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // const checkUserAccess = () => {
  //   console.log('user.role->', user.role);
    
  //   if (!user || !user.role) {
  //     setModalMessage('Register as a Freelancer or B2B to view projects');
  //     setShowModal(true);
  //     return false;
  //   }
  //   // console.log('bool->', ['Freelancer', 'B2B'].includes(user.role));
  //   // if (['Freelancer', 'B2B'].includes(user.role)) {
      
  //   //   setModalMessage('Change role to Freelancer or B2B to view projects');
  //   //   setShowModal(true);
  //   //   return false;
  //   // }
  //   if(user.role == 'JobSeeker') {
  //     setModalMessage('Change role to Freelancer or B2B to view projects');
  //     setShowModal(true);
  //     return false;
  //   }

  //   if(user.role != 'JobSeeker') {
      
  //     navigate(`/dashboard/projects`);
  //     return false;
  //   }

  //   return true;
  // };

  const handleViewDetails = (id) => {
  toggleExpand(id);
};


  // const handleViewDetails = (id) => {
  //   if (checkUserAccess()) {
  //     toggleExpand(id);
  //   }
  // };

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
      <div className="freelance-hero-section">
        <div className="freelance-hero-overlay">
          <h1 className="freelance-hero-title">Empower Your Career as a <span className='word'>Freelancer</span></h1>
        </div>
      </div>

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

      <section className="freelancer-projects freelance-fade-section">
        <Container>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project._id} className={`job-card mb-4 ${expandedId === project._id ? "expanded" : ""}`}>
                <div className="job-title-wrapper">
                  <h4 className="job-title">{project.title}</h4>
                </div>
                <Row>
                  <Col md={5} className="d-flex flex-column justify-content-center">
                    <p><strong>Category:</strong> {project.category?.join(', ')}</p>
                    <p><strong>Technologies:</strong> {project.technologies?.join(', ')}</p>
                    <h5 className="start-date">
                      <strong>Start Date:</strong>{' '}
                      {project.start_date ? new Date(project.start_date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      }) : 'N/A'}
                    </h5>
                  </Col>
                  <Col md={7} className="description-col">
                    <p>
                      <strong>Description:</strong>{' '}
                      {expandedId === project._id ? project.description : `${project.description.substring(0, 150)}...`}
                      <span className='learn-more' onClick={() => handleViewDetails(project._id)}>{expandedId === project._id ? 'View Less' : 'View More'}</span>
                    </p>
                    {/* <Button variant="outline-primary" onClick={() => handleViewDetails(project._id)}>
  {expandedId === project._id ? 'View Less' : 'View More'}
</Button>  */}
                    
                    {expandedId === project._id && (
                      <div className="mt-3">
                        <p><strong>Contact Email:</strong> <span style={{ color: "#007bff" }}>info@znotec.com</span></p>
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

      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Access Restricted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" as={Link} to="/sign_in">
            Register / Login
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Freelancer;
