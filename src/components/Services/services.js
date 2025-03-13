// Services.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "./services.css"
import { motion } from "framer-motion";

// const services = [
//   {
//     title: 'SAP Managed Services',
//     description: 'We cover compliance, data protection, scalability, and availability needs of your SAP systems.',
//     image: 'sap.png', // Replace with actual image URL
//     link: '/sap-managed-services'
//   },
//   {
//     title: 'SAP HANA Training',
//     description: 'Professional training to utilize SAP modules effectively and improve organizational processes.',
//     image: '/SAP-HANA.png', // Replace with actual image URL
//     link: '/sap-hana-training'
//   },
//   {
//     title: 'system administration',
//     description: 'System Administration at Znotec GmbH ensures secure, efficient, and scalable IT infrastructure with expert management of servers, networks, and cloud solutions.',
//     image: '/microsoft.png', // Replace with actual image URL
//     link: '/microsoft-dynamics-365'
//   },
//   {
//     title: 'Enterprise Resource Planning',
//     description: 'Deploy SAP ERP systems to monitor client demand and improve inventory management.',
//     image: '/erp.png', // Replace with actual image URL
//     link: '/enterprise-resource-planning'
//   },
//   {
//     title: 'Cloud Computing',
//     description: 'Services including file storage, backup, web-based email, and project management tools.',
//     image: '/cloud.png', // Replace with actual image URL
//     link: '/cloud-computing'
//   },
//   {
//     title: 'Training',
//     description: 'Comprehensive training and education programs across various industries.',
//     image: 'training.png', // Replace with actual image URL
//     link: '/training'
//   },
//   {
//     title: 'IT Consulting',
//     description: 'Consultancy services to help individuals and businesses with their IT needs.',
//     image: '/it_consulting.png', // Replace with actual image URL
//     link: '/it-consulting'
//   },
//   {
//     title: 'Website Development',
//     description: 'Building functional designs that work, promoting you and your business 24/7.',
//     image: '/website.png', // Replace with actual image URL
//     link: '/website-development'
//   }
// ];
const services = [
  {
    title: 'SAP Managed Services',
    description: 'Znotec provides end-to-end SAP Managed Services, ensuring high availability, security, and scalability for your SAP landscape. Our experts handle system monitoring, upgrades, performance optimization, and compliance, allowing your organization to focus on business growth while we ensure a stable and efficient SAP environment.',
    image: 'sap.png', // Replace with actual image URL
    link: '/sap-managed-services'
  },
  {
    title: 'SAP HANA Training',
    description: 'Empower your workforce with professional SAP HANA training from Znotec. Our expert-led sessions cover in-memory computing, real-time analytics, and advanced database functionalities. Gain hands-on experience and certification to enhance business decision-making and optimize operations using SAP HANA’s cutting-edge features.',
    image: '/SAP-HANA.png', // Replace with actual image URL
    link: '/sap-hana-training'
  },
  {
    title: 'System Administration',
    description: 'Our System Administration services ensure seamless IT infrastructure management with 24/7 monitoring, security patching, and performance optimization. We specialize in server management, cloud computing, disaster recovery, and networking solutions, ensuring business continuity and operational efficiency.',
    image: '/microsoft.png', // Replace with actual image URL
    link: '/microsoft-dynamics-365'
  },
  {
    title: 'Enterprise Resource Planning',
    description: 'Znotec’s ERP solutions integrate finance, HR, supply chain, and operations into a unified system, improving business efficiency. With our SAP ERP implementation, businesses can automate workflows, enhance inventory management, and streamline customer interactions, leading to increased productivity and cost savings.',
    image: '/erp.png', // Replace with actual image URL
    link: '/enterprise-resource-planning'
  },
  {
    title: 'Cloud Computing',
    description: 'Modernize your IT infrastructure with Znotec’s cloud computing solutions. From hybrid cloud strategies to scalable storage and secure backups, we provide tailored cloud services, including AWS, Azure, and SAP Cloud Platform, ensuring seamless data access, enhanced collaboration, and cost-effective IT management.',
    image: '/cloud.png', // Replace with actual image URL
    link: '/cloud-computing'
  },
  {
    title: 'Training & Professional Development',
    description: 'Upskill your workforce with our industry-focused training programs in SAP, IT, data analytics, and cloud computing. Our expert-led training courses equip professionals with hands-on experience, real-world case studies, and certification opportunities, helping them stay ahead in today’s digital economy.',
    image: 'training.png', // Replace with actual image URL
    link: '/training'
  },
  {
    title: 'IT Consulting',
    description: 'Optimize your IT strategy with Znotec’s expert IT consulting services. We analyze your business needs and provide custom solutions in digital transformation, cybersecurity, cloud migration, and IT infrastructure optimization, ensuring efficiency, cost reduction, and technological innovation.',
    image: '/it_consulting.png', // Replace with actual image URL
    link: '/it-consulting'
  },
  {
    title: 'Website & Digital Solutions',
    description: 'Elevate your online presence with our custom website development services. We create high-performance, responsive, and visually stunning websites, integrating the latest UI/UX design principles, SEO optimization, and advanced e-commerce functionalities to help your business thrive in the digital world.',
    image: '/website.png', // Replace with actual image URL
    link: '/website-development'
  }
];

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="service-hero-section">
        <div className="service-hero-overlay">
          <h1 className="hero-title">Seamless <span className='word'>Services</span> for a Digital Future</h1>
        </div>
      </div>
      <div className="znotec-services">
      {/* Section Heading */}
      <Container>
        
        <section className="service-section">
        <Container>
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }} // Ensures animation triggers once when 30% visible
          >
            <h2 className="section-title">We are a very dedicated team</h2>
            <p className="section-description">
              <strong>How can we help you?</strong> <br />
              Explore more about our solutions & services. If you have an enquiry 
              which is not addressed amongst the service list, please feel free to 
              contact us today for a custom quote.
            </p>
            <a href="/contact" className="service-btn btn btn-primary">Contact Us</a>
          </motion.div>
        </Container>
      </section>
        {/* Service Grid */}
        <motion.h2
          className="text-center section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore our services
        </motion.h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <motion.div 
                className="service-page-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="service-card-inner"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Front Side - Image */}
                  <div className="service-card-front">
                    <div className="service-card-content">
                      <img src={service.image} alt={service.title} className="service-page-image" />
                      <h3>{service.title}</h3>
                    </div>
                  </div>

                  {/* Back Side - Title and Description */}
                  <div className="service-card-back">
                    {/* <h3>{service.title}</h3> */}
                    <p>{service.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default Services;
