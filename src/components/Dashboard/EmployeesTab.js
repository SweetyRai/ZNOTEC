import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form, Card, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const EmployeesTab = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [skills, setSkill] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState('all');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEmployees = async () => {
    try {
      const url = viewMode === 'all'
        ? `${API_URL}/private/api/employees/all`
        : `${API_URL}/private/api/employees/${user._id}`;

      const res = await fetch(url);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [viewMode]);

  const handleSubmit = async () => {
    await fetch(`${API_URL}/private/api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, skills, b2bId: user._id })
    });
    setShowModal(false);
    resetForm();
    fetchEmployees();
  };

  const handleUpdate = async () => {
    await fetch(`${API_URL}/private/api/employees/${selectedEmployee._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, skills })
    });
    setSelectedEmployee(null);
    setIsEditing(false);
    resetForm();
    fetchEmployees();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPosition('');
    setSkill('');
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setName(employee.name);
    setEmail(employee.email);
    setPosition(employee.position);
    setSkill(employee.skills);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Employees</h4>
        <Button onClick={() => { resetForm(); setShowModal(true); }}>+ Add Employee</Button>
      </div>

      {!selectedEmployee && (
        <div className="mb-3 d-flex gap-2 align-items-center">
          <strong>View:</strong>
          <ToggleButtonGroup
            type="radio"
            name="viewMode"
            value={viewMode}
            onChange={val => setViewMode(val)}
          >
            <ToggleButton
              id="view-all"
              value="all"
              variant={viewMode === 'all' ? 'primary' : 'outline-primary'}
            >
              All Employees
            </ToggleButton>
            <ToggleButton
              id="view-mine"
              value="mine"
              variant={viewMode === 'mine' ? 'primary' : 'outline-primary'}
            >
              My Employees
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}

      {selectedEmployee ? (
        <div>
          <Button variant="link" className="mb-3" onClick={() => {
            setSelectedEmployee(null);
            setIsEditing(false);
          }}>
            ← Back to Employees
          </Button>

          <Card className="p-4 shadow-sm mb-3">
            <Row>
              <Col md={6}><Form.Group><Form.Label>Name</Form.Label><Form.Control value={name} onChange={e => setName(e.target.value)} disabled={!isEditing} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} /></Form.Group></Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}><Form.Group><Form.Label>Position</Form.Label><Form.Control value={position} onChange={e => setPosition(e.target.value)} disabled={!isEditing} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Skills</Form.Label><Form.Control value={skills} onChange={e => setSkill(e.target.value)} disabled={!isEditing} /></Form.Group></Col>
            </Row>
            <div className="text-end mt-4">
              {isEditing ? (
                <>
                  <Button variant="success" onClick={handleUpdate}>Save</Button>
                  <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <ListGroup>
          {employees.map(e => (
            <ListGroup.Item key={e._id} action onClick={() => handleEmployeeClick(e)}>
              <strong>{e.name}</strong> - {e.position} <small className="text-muted">({e.skills || 'No skill specified'})</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Employee</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control value={position} onChange={e => setPosition(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control value={skills} onChange={e => setSkill(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesTab;
