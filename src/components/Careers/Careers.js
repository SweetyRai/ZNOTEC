import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported
import './Careers.css';  // Import the CSS styles for this component
import { motion } from "framer-motion";
import { Container, Col, Row } from 'react-bootstrap';

function Careers() {
  // State for job search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Dummy job listings data (placeholder to be replaced with dynamic data)
  const jobs = [
    { id: 1, title: 'Software Engineer', location: 'Berlin, DE', category: 'Engineering' },
    { id: 2, title: 'Marketing Specialist', location: 'New York, US', category: 'Marketing' },
    { id: 3, title: 'HR Manager', location: 'London, UK', category: 'HR' },
    { id: 4, title: 'DevOps Engineer', location: 'Remote', category: 'Engineering' },
    { id: 5, title: 'UI/UX Designer', location: 'San Francisco, US', category: 'Design' },
  ];

  const careersData = [
    { title: "Why join ZNOTEC", image: "/career-1.jpg", link: "#", className: "career-card white-card", description: '"Join ZNOTEC to innovate, grow, and excel in cutting-edge technology solutions with a dynamic and collaborative team!"' },
    { title: "Life at ZNOTEC", image: "/career-2.jpg", link: "#", className: "career-card blue-card", description: '"Experience a dynamic, inclusive, and innovation-driven work culture where your ideas thrive!"' },
    { title: "Meet our people", image: "/career-3.jpg", link: "#", className: "career-card dark-blue-card", description: '"Join a passionate team of experts committed to collaboration, growth, and technological excellence"' },
    { title: "Career paths", image: "/career-4.jpg", link: "#", className: "career-card white-card", description: '"Unlock endless opportunities to grow, innovate, and shape your future with ZNOTEC"' },
  ];

  // Filter job listings based on search term and selected category
  const filteredJobs = jobs.filter(job => {
    const matchesTerm = (job.title + job.location).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || job.category === category;
    return matchesTerm && matchesCategory;
  });

  // Set up scroll-triggered fade-in animations using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');  // Add class to trigger CSS animation
          observer.unobserve(entry.target);       // Animate only once
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all sections with class 'fade-section'
    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => observer.observe(section));
    
    // Cleanup on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="careers-page">

      {/* Hero Job Search Section */}
      <section className="careers-hero-section text-center text-white d-flex flex-column justify-content-center align-items-center fade-section">
        <div className="container">
          <h1 className="display-5 fw-bold">Find Your Future with Us</h1>
          <p className="lead">Join a team that values innovation, collaboration, and growth.</p>
          {/* Job search form: keyword and category */}
          <form className="job-search-form align-items-center justify-content-center gap-2 mt-4">
            <Row className='search-row'>
              <Col>
                <input 
                type="text" 
                className="form-control career-form form-control-lg" 
                placeholder="Search jobs..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
              </Col>
              <Col>
                <select 
                className="form-select form-select-lg" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
              >
                  <option value="All">All Categories</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Design">Design</option>
                </select>
              </Col>
            </Row>
            
            <div>
              <button type="button" className="btn btn-orange btn-lg px-4">
                Search Jobs
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="jobs-section bg-white py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-4">Current Job Openings</h2>
         
          <div className="row">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className="col-md-4 mb-4 ">
                  <div className="job-listing box linear p-4 h-100 border rounded-3 card-hover">
                    <h5 className="fw-semibold">{job.title}</h5>
                    <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="mb-2"><strong>Category:</strong> {job.category}</p>
                    <button className="btn btn-sm btn-outline-primary mt-auto">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No jobs found for your criteria.</p>
            )}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="culture-section py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-4">Life at Our Company</h2>
          <p className="text-center mb-5 mx-auto w-75 culture-section-text">
            We foster a culture of innovation, diversity, and collaboration. 
            Our teams thrive in an environment where every voice is heard and every idea matters.
          </p>
          <div className="row text-center">
            <div className="col-md-6 mb-4">
            <div className='career-card'>
              <h5 className="fw-semibold">Innovation</h5>
              <p className="mb-0">Pushing boundaries to find creative solutions in technology and business.</p>
            </div>
              
            </div>
            <div className="col-md-6 mb-4">
            <div className='career-card'>
              <h5 className="fw-semibold">Diversity</h5>
              <p className="mb-0">Embracing different backgrounds and perspectives to enrich our team.</p>
            </div>
              
            </div>
            
          </div>

          <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div className='career-card'>
              <h5 className="fw-semibold">Collaboration</h5>
              <p className="mb-0">Working together across teams and geographies to achieve success.</p>
            </div>
              
            </div>
            <div className="col-md-6 mb-4">
            <div className='career-card'>
              <h5 className="fw-semibold">Growth</h5>
              <p className="mb-0">Supporting continuous learning and career development for every employee.</p>
            </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="careers-section">
      <Container>
      <h2 className="text-center mb-4">Explore ZNOTEC</h2>
        <Row className="g-4 justify-content-center">
          {careersData.map((item, index) => (
            <Col key={index} md={6} lg={5} className="career-col">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={item.image} alt={item.title} className="career-image" />
                    <h3>{item.title}</h3>
                    <a href={item.link} className="arrow-link">→</a>
                  </div>
                  <div className="flip-card-back">
                    <h3>{item.description}</h3>
                    {/* <a href={item.link} className="arrow-link">→</a> */}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>

      {/* Benefits & Perks Section */}
      <section className="benefits-section bg-light py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-4">Benefits &amp; Perks</h2>
          <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div className="p-4 h-100 benefit card-hover">
              <h5 className="fw-semibold">Flexible Work</h5>
              <p className="text-muted small mb-0">
                Options for remote work and flexible schedules to balance life and career.
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-4 h-100 benefit card-hover">
              <h5 className="fw-semibold">Learning &amp; Development</h5>
              <p className="text-muted small mb-0">
                Continuous learning opportunities, training, and mentorship for career advancement.
              </p>
            </div>
          </div>
        </div>

        </div>
      </section>

      {/* Employee Testimonials Section */}
      {/* <section className="testimonials-section py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-5">What Our Employees Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 h-100">
                <p className="mb-3">“Working here has been a transformative experience. The team truly cares and pushes me to grow.”</p>
                <p className="small text-muted mb-0">— Jane D., Software Engineer</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 h-100">
                <p className="mb-3">“The inclusive culture and collaborative spirit make every day engaging and fulfilling.”</p>
                <p className="small text-muted mb-0">— John S., Project Manager</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 h-100">
                <p className="mb-3">“I appreciate the flexible work options and the emphasis on continuous learning.”</p>
                <p className="small text-muted mb-0">— Alice W., Business Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      

      {/* Blog Articles Section */}
      {/* <section className="blog-section py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-4">From Our Blog</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 card-hover">
                <img src="https://source.unsplash.com/400x300/?career,success" className="card-img-top" alt="Career Growth" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Career Growth Tips</h5>
                  <p className="card-text flex-grow-1">Learn how to advance your career with expert advice and insider tips.</p>
                  <a href="#" className="stretched-link text-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 card-hover">
                <img src="https://source.unsplash.com/400x300/?technology,office" className="card-img-top" alt="Tech Culture" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Innovative Tech Culture</h5>
                  <p className="card-text flex-grow-1">Discover how our teams leverage technology to drive innovation every day.</p>
                  <a href="#" className="stretched-link text-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 card-hover">
                <img src="https://source.unsplash.com/400x300/?learning,team" className="card-img-top" alt="Learning" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Learning &amp; Development</h5>
                  <p className="card-text flex-grow-1">Explore stories of continuous learning and career development at our company.</p>
                  <a href="#" className="stretched-link text-primary">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Careers;
