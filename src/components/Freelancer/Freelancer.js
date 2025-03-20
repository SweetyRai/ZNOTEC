import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './Freelancer.css';
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Freelancer = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Dummy freelance projects
  const freelanceProjects = [ 
    { 
        id: 1, 
        title: "React Developer Needed", 
        category: "Web Development", 
        location: "Berlin", 
        startDate: "March, 2025", 
        description: "We are looking for an experienced React Developer to build a fully responsive web application from scratch. The ideal candidate should have a strong grasp of React.js, Redux, and API integrations. You will collaborate closely with our UI/UX designers and backend engineers to develop a seamless and dynamic user experience. Responsibilities include developing and maintaining a scalable React.js application, implementing Redux for efficient state management, optimizing performance, ensuring cross-browser compatibility, and handling API integrations. Proficiency in React.js, Redux, TypeScript, HTML5, CSS3, and tools like Webpack, Babel, and Git is required. Candidates should have at least 3 years of experience in front-end development and experience working on scalable web applications. Benefits include competitive freelance compensation, remote work flexibility, and the opportunity to work on an innovative greenfield project.",
        email: "Info@znotec.com"
    },
    { 
        id: 2, 
        title: "Logo & Branding Designer", 
        category: "Graphic Design", 
        location: "Berlin", 
        startDate: "March, 2025", 
        description: "We are seeking a creative and skilled graphic designer to establish a unique brand identity for our startup. This role involves designing a logo, color palette, typography, and branding elements that align with our company's vision. Responsibilities include developing a complete brand identity, creating digital and print-friendly assets, and collaborating with the marketing team to ensure alignment with branding strategy. Candidates should have at least 2 years of experience in branding and graphic design, proficiency in Adobe Illustrator, Photoshop, and Figma, and a strong portfolio showcasing previous branding projects. Experience in UI/UX design is a plus. Benefits include remote work flexibility, competitive freelance compensation, and the opportunity to work on an exciting startup brand from scratch.",
        email: "Info@znotec.com"
    },
    { 
        id: 3, 
        title: "SEO Expert for E-commerce", 
        category: "Digital Marketing", 
        location: "Berlin", 
        startDate: "March, 2025", 
        description: "We are looking for an SEO specialist to optimize our e-commerce website and improve search engine rankings. Responsibilities include conducting keyword research, performing on-page and off-page SEO, optimizing product pages for conversions, and analyzing website traffic to identify areas for improvement. Candidates should have at least 3 years of experience in SEO and digital marketing, familiarity with tools like Google Analytics, Search Console, SEMrush, and Ahrefs, and experience in technical SEO, schema markup, and backlink strategies. Benefits include flexible work-from-home options, competitive freelance compensation, and the opportunity to lead SEO strategy independently for a growing e-commerce business.",
        email: "Info@znotec.com"
    },
    { 
        id: 4, 
        title: "Blog Writer for Tech Startup", 
        category: "Content Writing", 
        location: "Berlin", 
        startDate: "April, 2025", 
        description: "We are looking for a tech-savvy content writer to produce engaging and informative blog articles for our tech startup. Topics will cover software development, artificial intelligence, emerging tech trends, and industry insights. Responsibilities include writing SEO-optimized blog posts, researching industry trends, working with developers and designers to create interactive content, and formatting and publishing content on platforms like WordPress or Medium. Candidates should have at least 2 years of experience in content writing for technology, a strong understanding of AI, software development, and cybersecurity, and familiarity with SEO best practices and keyword research. Benefits include competitive freelance compensation, remote work flexibility, and an opportunity to contribute valuable content to a fast-growing tech community.",
        email: "Info@znotec.com"
    }
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
      {/* <section className="freelancer-projects freelance-fade-section">
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
      </section> */}
      <section className="freelancer-projects freelance-fade-section">
      <Container>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`job-card mb-4 ${expandedId === project.id ? "expanded" : ""}`}
            >
              <div className="job-title-wrapper">
                <h4 className="job-title">{project.title}</h4>
              </div>

              <Row>
                <Col md={5} className="d-flex flex-column justify-content-center">
                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {project.location}
                  </p>
                  <h5 className="start-date">
                    <strong>Start Date:</strong> {project.startDate}
                  </h5>
                </Col>

                <Col md={7} className="description-col">
                  <p>
                    <strong>Description:</strong>{" "}
                    {expandedId === project.id
                      ? project.description
                      : `${project.description.substring(0, 150)}...`}
                    <a
                      href="#"
                      className="learn-more"
                      style={{ color: "#007bff", textDecoration: "none" }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand(project.id);
                      }}
                    >
                      {expandedId === project.id ? " Learn Less" : " Learn More"}
                    </a>
                  </p>

                  {/* Show email instead of Apply button */}
                  {expandedId === project.id && (
                    <div className="mt-3">
                      <p>
                        <strong>Contact Email:</strong>{" "}
                        <span style={{ color: "#007bff" }}>{project.email}</span>
                      </p>
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
      <section className="freelancer-opportunities custom-section">
  <Container>
    <h2 className="text-center mb-5">Freelance Categories</h2>
    <Row className="g-4 justify-content-center">
      {[
        { 
          title: "SAP Consulting & Services", 
          text: "Empowering businesses with tailored SAP solutions to streamline operations, drive efficiency, and deliver measurable results. Our expert consultants are committed to guiding clients through successful SAP implementations and upgrades.", 
          image: "/design.jpg" 
        },
        { 
          title: "Enterprise Resource Planning (ERP)", 
          text: "We deliver innovative ERP solutions to help organizations integrate processes, optimize workflows, and gain actionable insights. Our team ensures a seamless transition that aligns with your business objectives.", 
          image: "/marketing.jpg"  
        },
        { 
          title: "System Administration", 
          text: "Providing secure, reliable, and scalable system infrastructure management. Our system administrators ensure optimal performance and uptime of IT systems while fostering a collaborative environment for success.", 
          image: "/content.jpg"
        }
      ]
      .map((item, index) => (
        <Col key={index} md={6} lg={4}>
          <div className="culture-card">
            <img src={item.image} alt={item.title} className="culture-card-img" />
            <div className="culture-card-body">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
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
          <Button variant="primary" size="lg" className="hero-button">
            <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
            Join Now
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
};

export default Freelancer;
