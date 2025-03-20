import React, {useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './About.css';  // Optional for custom styling

const About = () => {
  const [hovered, setHovered] = useState(false);
  const services = [
    {
      id: 1,
      title: "Best SAP Managed Services",
      description:
        "We are directly accountable for making sure all SAP systems securely and dependably support our customers’ business processes and use modern and updated technologies.",
      icon: "bi-bar-chart",
      backgroundImage: "url('/about-services-1.jpg')",
    },
    {
      id: 2,
      title: "Microsoft Server Management",
      description:
        "We offer Server Installation and Management with Networking Installation (Cabling, Patching, Switching, and Routing).",
      icon: "bi-pc-display-horizontal",
      backgroundImage: "url('/about-services-2.jpg')",
    },
    {
      id: 3,
      title: "Training",
      description:
        "We offer training in SAP systems, and Microsoft Dynamics 365, Microsoft Networking, and Server Management.",
      icon: "bi-pencil",
      backgroundImage: "url('/about-services-3.jpg')",
    },
  ];
  
  return (
    <div className="about-page">

      {/* Image Slider */}
      <section className="image-banner">
 
</section>

      <section className='about-us'>
      <Container className="about-container">
      {/* Top Section with Image and About Us Box */}
      <Row>
        <Col md={5} className="about-image">
          <img src="/about-team.jpg" alt="Team Working" className="img-fluid rounded" />
          <div className='about-img-title'>At ZNOTEC, our team is ready to tackle any of your projects</div>
        </Col>
        <Col md={7} className="about-text">
          <div className="about-box">
            <h2>About Us</h2>
            <p>
              We are your best bet on SAP Implementation, optimisation, upgrade, and redesign.
              We provide services in IT consulting, SAP Server Management, and Cloud as well.
            </p>
          </div>
        </Col>
      </Row>

      {/* Bottom Section with Additional Info */}
      <Row className="text-center mt-4">
        <Col>
          <p className="about-description">
            ZNOTEC GmbH is one of the top firms offering consultancy and other services
            in the field of information technology. Since its inception in 2010, we have
            stood for digital excellence and are a leader in SAP solutions. The company
            has over 10 years of experience providing IT services to large clients. We pride
            ourselves in excellent IT consultation as a result of effective processes,
            secure systems, and dependable system administration.
          </p>
        </Col>
      </Row>
    </Container>
      </section>

      <section className="about-hero-section">
      <div className="overlay">
        <p className="contact-text">
          <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
          Contact Us Today! 
          </Link>
        </p>
      </div>
      <img
        src="/about-team-sec.jpg" // Change this to your image path
        alt="Office Team Working"
        className="hero-image"
      />
    </section>

    <section className="sap-solution container my-5">
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-lg-6 col-md-12 text-section">
          <h2 className="title">
            We provide the finest quality of SAP Solution to our consumers.
          </h2>
          <p className="description">
            We emphasize on the areas of business digitization transformation
            using cloud computing, Server security, SAP, and IT consulting.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="col-lg-6 col-md-12 image-section">
          <div
            className={`overlay-box ${hovered ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/sap-solution.jpg" // Change to your image path
              alt="SAP Solution"
              className="solution-image"
            />
            <div className="overlay-text">
              {!hovered ? (
                "#1 at SAP solution"
              ) : (
                <>
                  #1 at SAP solution <br /> <span>A dependable Partner</span>
                </>
              )}
            </div>
            <div className="square-overlay"></div>
          </div>
          
        </div>
      </div>
    </section>
    <section className='about-services'>
      <div className="container mt-5">
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-4" key={service.id}>
              <div
                className={`about-service-card p-4 text-center ${
                  service.background ? service.background : ""
                }`}
                style={service.backgroundImage ? { backgroundImage: service.backgroundImage } : {}}
              >
                <i className={`bi ${service.icon} icon mb-3`}></i>
                <h4 className="fw-bold">{service.title}</h4>
                <p className="text-light">{service.description}</p>
                <button className="btn btn-primary">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
