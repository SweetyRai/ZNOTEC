import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./Home.css"; // Import custom CSS
import AnimateCard from './card';
import { motion, useScroll, useTransform } from "framer-motion";


const cardData = [
  { 
    id: 1,  
    title: "Finance & Accounting", 
    icon: "💰",
    bgColor: "linear-gradient(to bottom, #e7f2fd, #e7f2fd)", 
    description: "Manage financial records, budgets, and transactions efficiently." 
  },
  { 
    id: 2, 
    title: "Human Resources", 
    icon: "👤",
    bgColor: "linear-gradient(to bottom, #f7d0bb, #f7d0bb)", 
    description: "Handle employee relations, payroll, and recruitment processes."
  },
  { 
    id: 3, 
    title: "Access Control", 
    icon: "🔒", 
    bgColor: "linear-gradient(to bottom, #e7f2fd, #e7f2fd)", 
    description: "Ensure secure access to facilities and sensitive data."
  },
  { 
    id: 4, 
    title: "Project Management", 
    icon: "📈", 
    bgColor: "linear-gradient(to bottom, #f7d0bb, #f7d0bb)", 
    description: "Plan, execute, and monitor projects for efficient workflows."
  },
  { 
    id: 5, 
    title: "Customer Relation", 
    icon: "👥", 
    bgColor: "linear-gradient(to bottom, #e7f2fd, #e7f2fd)", 
    description: "Manage interactions with clients to improve satisfaction and retention."
  },
  { 
    id: 6, 
    title: "Data Services", 
    icon: "💾", 
    bgColor: "linear-gradient(to bottom, #f7d0bb, #f7d0bb)", 
    description: "Process, store, and analyze data for business insights."
  },
  { 
    id: 7, 
    title: "Engineering", 
    icon: "⚙️", 
    bgColor: "linear-gradient(to bottom, #e7f2fd, #e7f2fd)", 
    description: "Develop and maintain technical solutions and innovations."
  },
  { 
    id: 8, 
    title: "Purchasing", 
    icon: "💳", 
    bgColor: "linear-gradient(to bottom, #f7d0bb, #f7d0bb)", 
    description: "Manage procurement and supply chain operations."
  },
  { 
    id: 9, 
    title: "Znotec Company", 
    icon: "🏢", 
    bgColor: "linear-gradient(to bottom, #e7f2fd, #e7f2fd)", 
    description: "A leading provider of business solutions, specializing in technology-driven innovations and enterprise management."
  }
];


const Home = () => {
  const topSectionRef = useRef(null);
  const middleSectionRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [scrolling, setScrolling] = useState(0);

 

  // Create a transformation for all cards
  const yTransform = useTransform(scrollYProgress, [0, 1], [1, -1]);

  useEffect(() => {
    // Add animation classes when the component mounts
    if (topSectionRef.current) {
      topSectionRef.current.classList.add("fade-in-left");
    }
    if (middleSectionRef.current) {
      middleSectionRef.current.classList.add("fade-in-right");
    }

  
    // let lastScrollY = window.scrollY;
    // const handleScroll = () => {
    //   setDirection(window.scrollY > lastScrollY ? "down" : "up");
    //   setScrollY(window.scrollY);
    //   lastScrollY = window.scrollY;
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);

    const handleCardScroll = () => {
      setScrolling(window.scrollY);
    };
    window.addEventListener("scroll", handleCardScroll);
    return () => window.removeEventListener("scroll", handleCardScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/hero_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="home-hero-title">
                Your Partner for Innovative IT Solutions
              </h1>
              <p className="home-hero-subtitle">
                We deliver cutting-edge technology solutions to drive your business
                forward.
              </p>
              <Button variant="primary" size="lg" className="hero-button">
                <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                  Get Started
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>


      <section className="top-section" ref={topSectionRef}>
        <Container>
          <Row className="align-items-center">
            <Col md={3}>
              <div className="image-container top-img-1">
                <img src="/z1.jpg" alt="Work" className="top-image1" />
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
              </div>
            </Col>
            <Col md={3}>
              <div className="image-container">
                <img src="/z2.jpg" alt="Work" className="top-image2" />
                <div className="shape shape3"></div>
              </div>
            </Col>
            <Col md={6} className="text-start">
              <h1 className="top-title">👋 Hello! We are Znotec.</h1>
              <p className="top-subtitle">
                We make SAP solutions faster and less expensive.
              </p>
              <Button variant="primary" size="lg" className="hero-button">
                <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
                Learn more about us
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Middle Section */}
      <section className="middle-section" ref={middleSectionRef}>
        {/* <Container> */}
          <Row className="align-items-center">
            <Col md={12}>
              <div className="middle-background-container">
                {/* Background Image */}
                <img
                  src="/middle_img.jpg"
                  alt="Team Collaboration"
                  className="middle-background-image"
                />
                {/* White Card with Text */}
                <div className="middle-text-card">
                  <h2>At Znotec,</h2>
                  <p>
                    We regard ourselves as close and dependable partners. For our
                    clients ranging from huge enterprises to medium-sized
                    businesses, we develop innovative solutions and lasting added
                    value to their organization.
                  </p>
                  <Button variant="primary" size="lg" className="hero-button">
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                       Got a project? Contact us!
                    </Link>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        {/* </Container> */}
      </section>

      <section className="services-section">
        <Container>
          <h2 className="section-title">Our Solutions & Services</h2>
          <Row>
            {/* SAP Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/sap.png" // Replace with your image path
                    alt="SAP"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>SAP</Card.Title>
                  <Card.Text>
                    We host SAP systems for national and international businesses of
                    various sizes.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                  <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                      Read More
                  </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* ERP Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/erp.png" // Replace with your image path
                    alt="ERP"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>ERP</Card.Title>
                  <Card.Text>
                    SAP modules to improve your business collaboration.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                    <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                        Read More
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Microsoft Dynamics 365 Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/microsoft.png" // Replace with your image path
                    alt="Microsoft Dynamics 365"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>system administration</Card.Title>
                  <Card.Text>
                  System Administration ensures secure, efficient, and scalable IT infrastructure.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                    <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                        Read More
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Cloud Computing Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/cloud.png" // Replace with your image path
                    alt="Cloud Computing"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>Cloud Computing</Card.Title>
                  <Card.Text>
                    We help your business reduce costs with our certified SAP cloud
                    solutions.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                    <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                        Read More
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* SAP HANA Training Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/SAP-HANA.png" // Replace with your image path
                    alt="SAP HANA Training"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>SAP HANA Training</Card.Title>
                  <Card.Text>
                    Getting started with SAP HANA has never been simpler, so we provide
                    you with an approach to training that is easy to follow.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                    <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                        Read More
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Website Development Card */}
            <Col md={4} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src="/website.png" // Replace with your image path
                    alt="Website Development"
                    className="service-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>Website Development</Card.Title>
                  <Card.Text>
                    We do not just build beautiful websites and graphics, we build
                    functional designs that work.
                  </Card.Text>
                  <Button variant="primary" className="service-button">
                    <Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>
                        Read More
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
                </Row>
        </Container>
      </section>

      {/* SAP Services Grid Section */}
      <section className="services-section">
        <h2 className="home-section-title">Our Solutions & Services</h2>
        <div className="animate-cards-container">
          {cardData.map((card) => (
            <AnimateCard key={card.id} title={card.title} icon={card.icon} bgColor={card.bgColor} description={card.description}/>
          ))}
        </div>
      </section>

      

    
      
    </div>
  );
};

export default Home;