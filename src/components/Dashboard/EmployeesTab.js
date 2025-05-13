import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form, Card, Row, Col } from 'react-bootstrap';

const EmployeesTab = ({ user }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [skills, setSkill] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEmployees = async () => {
    const res = await fetch(API_URL + `/private/api/employees/${user._id}`);
    const data = await res.json();
    setEmployees(data);
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    await fetch(API_URL + `/private/api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, skills, b2bId: user._id })
    });
    setShowModal(false);
    resetForm();
    fetchEmployees();
  };

  const handleUpdate = async () => {
    console.log('emp id->', selectedEmployee._id);
    
    await fetch(API_URL + `/private/api/employees/${selectedEmployee._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, skills })
    });
    setSelectedEmployee(null);
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
    console.log('emp->', employee);
    
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

      {selectedEmployee ? (
        <Card className="p-4 shadow-sm mb-3">
          <Row>
            <Col md={6}><Form.Group><Form.Label>Name</Form.Label><Form.Control value={name} onChange={e => setName(e.target.value)} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control value={email} onChange={e => setEmail(e.target.value)} /></Form.Group></Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}><Form.Group><Form.Label>Position</Form.Label><Form.Control value={position} onChange={e => setPosition(e.target.value)} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Skills</Form.Label><Form.Control value={skills} onChange={e => setSkill(e.target.value)} /></Form.Group></Col>
          </Row>
          <div className="text-end mt-3">
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
            <Button variant="secondary" className="ms-2" onClick={() => setSelectedEmployee(null)}>Cancel</Button>
          </div>
        </Card>
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
          <Button variant="success" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesTab;
