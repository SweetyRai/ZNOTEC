import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Freelancer.css';
import { motion } from "framer-motion";
import { Container, Row, Col } from 'react-bootstrap';

const Freelancer = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Dummy freelance projects
  const freelanceProjects = [
    { id: 1, title: "React Developer Needed", category: "Web Development", budget: "$500" },
    { id: 2, title: "Logo & Branding Design", category: "Graphic Design", budget: "$250" },
    { id: 3, title: "SEO Expert for E-commerce", category: "Digital Marketing", budget: "$400" },
    { id: 4, title: "Blog Writing for Tech Startup", category: "Content Writing", budget: "$150" },
  ];

  // Filter freelance projects
  const filteredProjects = freelanceProjects.filter(project => {
    const matchesTerm = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || project.category === category;
    return matchesTerm && matchesCategory;
  });

  // Scroll Animation (Intersection Observer)
  useEffect(() => {
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
      {/* <section className="freelancer-hero text-center text-white d-flex align-items-center justify-content-center freelance-fade-section">
      <img src="/public/freelancer.jpg" alt="Freelancer Background" />
        <div className="container">
        
          <h1 className="display-5 fw-bold">Empower Your Career as a <span className='word'>Freelancer</span></h1>
          <p className="lead">Join a network of professionals, explore exciting projects, and grow your skills.</p>
        </div>
      </section> */}
      <div className="freelance-hero-section">
        <div className="freelance-hero-overlay">
          <h1 className="freelance-hero-title">Empower Your Career as a <span className='word'>Freelancer</span></h1>
        </div>
      </div>

        {/* Search Freelance Projects */}
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
            <Col md={4}>
              <select 
                className="form-select form-select-lg" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Writing">Content Writing</option>
              </select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Display Freelance Projects */}
      <section className="freelancer-projects freelance-fade-section">
        <Container>
          <Row>
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <Col key={project.id} md={6} lg={4} className="mb-4">
                  <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
                    <h5>{project.title}</h5>
                    <p><strong>Category:</strong> {project.category}</p>
                    <p><strong>Budget:</strong> {project.budget}</p>
                    <button className="btn btn-sm btn-outline-primary">View Details</button>
                  </motion.div>
                </Col>
              ))
            ) : (
              <p className="text-center">No projects found for your search criteria.</p>
            )}
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="freelancer-services freelance-fade-section">
        <Container>
          <h2 className="text-center section-title">Why Choose Freelancing?</h2>
          <Row>
            {[
              { title: "Flexible Work Hours", desc: "Work at your own pace and schedule." },
              { title: "Global Opportunities", desc: "Collaborate with clients worldwide." },
              { title: "Unlimited Earnings", desc: "Your income depends on your skills and dedication." },
            ].map((service, index) => (
              <Col key={index} md={4} className="mb-4">
                <motion.div className="service-card" whileHover={{ scale: 1.05 }}>
                  <h5>{service.title}</h5>
                  <p>{service.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Freelancing Opportunities */}
      <section className="freelancer-opportunities freelance-fade-section">
        <Container>
          <h2 className="text-center">Freelance Categories</h2>
          <Row className="g-4">
            {[
              { title: "Web Development", image: "/web-dev.jpg" },
              { title: "Graphic Design", image: "/design.jpg" },
              { title: "Digital Marketing", image: "/marketing.jpg" },
              { title: "Content Writing", image: "/content.jpg" },
            ].map((category, index) => (
              <Col key={index} md={6} lg={3}>
                <div className="freelance-flip-card">
                  {/* <div className="flip-card-inner"> */}
                    <div className="flip-card-front" style={{ backgroundImage: `url(${category.image})` }}>
                      <h3>{category.title}</h3>
                    </div>
                    {/* <div className="flip-card-back">
                      <p>Explore projects in {category.title} and start earning today.</p>
                    </div> */}
                  {/* </div> */}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="freelancer-cta text-center text-white freelance-fade-section">
        <div className="container">
          <h2>Start Your Freelancing Journey Today</h2>
          <button className="btn btn-light btn-lg">Join Now</button>
        </div>
      </section>

    </div>
  );
};

export default Freelancer;
