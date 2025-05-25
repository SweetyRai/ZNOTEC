import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const FreelancersTab = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [freelancers, setFreelancers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/freelancers`);
      const data = await res.json();
      setFreelancers(data);
      setFiltered(data);

      const skillSet = new Set();
      data.forEach(f => {
        if (Array.isArray(f.qualification)) {
          f.qualification.forEach(q => q.skill && skillSet.add(q.skill.trim()));
        }
      });
      setSkills(['All', ...Array.from(skillSet)]);
    } catch (err) {
      console.error('Failed to fetch freelancers', err);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedSkill(value);
    if (value === 'All') {
      setFiltered(freelancers);
    } else {
      const filteredList = freelancers.filter(f =>
        f.qualification?.some(q => q.skill === value)
      );
      setFiltered(filteredList);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Freelancers</h4>
      {!selectedFreelancer && (
        <>
          <Form.Group className="mb-4">
            <Form.Label>Filter by Skill</Form.Label>
            <Form.Select value={selectedSkill} onChange={handleFilterChange}>
              {skills.map((skill, idx) => (
                <option key={idx} value={skill}>{skill}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <ListGroup>
            {filtered.map(f => (
              <ListGroup.Item key={f._id} action onClick={() => setSelectedFreelancer(f)}>
                <div className="d-flex justify-content-between align-items-center">
                  <div><strong>{f.first_name} {f.last_name}</strong></div>
                  <div className="text-muted" style={{ fontSize: '0.9em' }}>
                    {f.qualification?.slice(0, 3).map(q => q.skill).join(', ') || 'No skills listed'}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}

      {selectedFreelancer && (
        <Card className="p-4 shadow-sm">
          <Button variant="link" onClick={() => setSelectedFreelancer(null)} className="mb-3">
            <ArrowLeft /> Back to List
          </Button>
          <h5>{selectedFreelancer.first_name} {selectedFreelancer.last_name}</h5>
          <p><strong>Email:</strong> {selectedFreelancer.email}</p>
          <p><strong>Phone:</strong> {selectedFreelancer.phone}</p>
          <p><strong>Skills:</strong> {selectedFreelancer.qualification?.map(q => q.skill).join(', ') || 'None listed'}</p>
        </Card>
      )}
    </div>
  );
};

export default FreelancersTab;
