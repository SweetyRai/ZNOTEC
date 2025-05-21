import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const ProjectsTab = ({ user }) => {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  const fetchProjects = async () => {
    const res = await fetch(API_URL + `/private/api/projects/${user._id}`);
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const projectId = url.get("projectId");
    if (projectId) {
      const project = projects.find(p => p._id === projectId);
      if (project) setSelectedProject(project);
    }
  }, [location.search, projects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    navigate(`?tab=projects&projectId=${project._id}`);
  };

  const handleBack = () => {
    setSelectedProject(null);
    navigate(`?tab=projects`);
  };

  const handleSubmit = async () => {
    await fetch(API_URL + '/private/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, technologies, category, start_date: startDate ,b2bId: user._id })
    });
    setShowModal(false);
    setTitle('');
    setDescription('');
    setTechnologies('');
    fetchProjects();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Projects</h4>
        <Button onClick={() => setShowModal(true)}>+ Create New Project</Button>
      </div>

      {selectedProject && (
        <Button variant="link" className="mb-3 back" onClick={handleBack}>
          <ArrowLeft /> Back to Projects
        </Button>
      )}


      {selectedProject ? (
  <Card className="p-3 mb-3 shadow-sm">
    <h5>{selectedProject.title}</h5>
    <p><strong>Description:</strong> {selectedProject.description}</p>

    <p>
      <strong>Technologies:</strong>{' '}
      {Array.isArray(selectedProject.technologies)
        ? selectedProject.technologies.join(', ')
        : selectedProject.technologies}
    </p>

    <p>
      <strong>Category:</strong>{' '}
      {Array.isArray(selectedProject.category) ? (
        selectedProject.category.map((cat, i) => (
          <span key={i} className="badge bg-info text-dark me-2">{cat}</span>
        ))
      ) : (
        <span className="badge bg-info text-dark">{selectedProject.category}</span>
      )}
    </p>

    <p>
      <strong>Start Date:</strong>{' '}
      {selectedProject.start_date ? new Date(selectedProject.start_date).toLocaleDateString() : 'N/A'}
    </p>
  </Card>
        ) : (
          <ListGroup>
            {projects.map(p => (
              <ListGroup.Item
                key={p._id}
                action
                onClick={() => handleProjectClick(p)}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{p.title}</strong>
                  <div className="text-muted" style={{ fontSize: '0.9em' }}>
                    {p.category?.join(', ') || 'No Category'}
                  </div>
                </div>
                <small className="text-muted">
                  {p.start_date ? new Date(p.start_date).toLocaleDateString() : 'No Date'}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Create Project</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control placeholder="e.g., Web, SaaS" value={category} onChange={e => setCategory(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Technologies</Form.Label>
              <Form.Control placeholder="e.g., React, Node.js, MongoDB" value={technologies} onChange={e => setTechnologies(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectsTab;
