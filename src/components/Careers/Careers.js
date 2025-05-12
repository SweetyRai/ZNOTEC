import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Careers.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';

function Careers() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [jobs, setJobs] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/v0/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      }
    };
    fetchJobs();
  }, [API_URL]);

  const handleViewDetails = (jobId) => {
    if (!user) {
      setModalMessage('Please sign in as JobSeeker to view job details and apply.');
      setShowModal(true);
    } else if (user.role !== 'JobSeeker') {
      setModalMessage('Change role to JobSeeker to view and apply for jobs.');
      setShowModal(true);
    } else {
      navigate(`/dashboard/jobs?jobid=${jobId}`);
    }
  };

  const filteredJobs = jobs.filter(job => {
  const matchesTerm = (job.title + job.location).toLowerCase().includes(searchTerm.toLowerCase());
  const matchesLocation = locationFilter === 'All' || job.location === locationFilter;
  return matchesTerm && matchesLocation;
});

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="careers-page">
      <section className="careers-hero-section text-center text-white d-flex flex-column justify-content-center align-items-center fade-section">
        <div className="container">
          <h1 className="display-5 fw-bold">Find Your Future with Us</h1>
          <p className="lead">Join a team that values innovation, collaboration, and growth.</p>
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
                  value={locationFilter} 
                  onChange={e => setLocationFilter(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  {[...new Set(jobs.map(j => j.location))].map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
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

      <section className="jobs-section bg-white py-5 fade-section">
        <div className="container">
          <h2 className="text-center mb-4">Current Job Openings</h2>
          <div className="row">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job._id} className="col-md-4 mb-4">
                  <div className="job-listing box linear p-4 h-100 border rounded-3 card-hover">
                    <h5 className="fw-semibold">{job.title}</h5>
                    <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="mb-2"><strong>Qualification:</strong> {job.qualification || 'Not specified'}</p>
                    <button className="btn btn-sm btn-outline-primary mt-auto" onClick={() => handleViewDetails(job._id)}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No jobs found for your criteria.</p>
            )}
          </div>
        </div>
      </section>

      {/* Keep remaining sections as is */}
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              if (!user) navigate('/sign_in');
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Careers;
