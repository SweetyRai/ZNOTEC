import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

const EmployeesTab = ({ user }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const fetchEmployees = async () => {
    const res = await fetch(`/api/b2b/employees/${user._id}`);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    await fetch('/api/b2b/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, b2bId: user._id })
    });
    setShowModal(false);
    fetchEmployees();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Employees</h4>
        <Button onClick={() => setShowModal(true)}>+ Add Employee</Button>
      </div>
      <ListGroup>
        {employees.map(e => <ListGroup.Item key={e._id}>{e.name} - {e.position}</ListGroup.Item>)}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Employee</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control value={position} onChange={e => setPosition(e.target.value)} />
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

export default EmployeesTab;
