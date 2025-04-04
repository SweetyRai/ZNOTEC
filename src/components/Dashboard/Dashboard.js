import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Row, Col, Nav, Tab, Card, Accordion,
  Button, Form, Alert
} from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChatBox from './ChatBox';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState(user?.role);
  const [qualifications, setQualifications] = useState([{ university: '', year: '', course: '' }]);
  const [experiences, setExperiences] = useState([{ company: '', from: '', to: '', role: '' }]);
  const [cv, setCv] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [password, setPassword] = useState('');

  const jobList = [
    {
      id: 1,
      title: "Frontend Developer - Remote",
      company: "ZNOTEC GmbH",
      introduction: "We are a cutting-edge software company delivering modern web applications.",
      role: "You will be working on React-based applications with focus on performance and UX.",
      qualification: "Bachelor's degree in Computer Science or equivalent. Minimum 1 year experience in frontend development."
    },
    {
      id: 2,
      title: "Backend NodeJS Developer - Berlin",
      company: "ZNOTEC GmbH",
      introduction: "Specializing in scalable backend solutions for enterprises.",
      role: "Responsible for building REST APIs using Node.js and MongoDB.",
      qualification: "Computer Science degree preferred. Experience in NodeJS and Express is required."
    }
  ];

  const calculateProfileCompletion = () => {
    const fields = [
      user?.first_name, user?.last_name, user?.email,
      user?.gender, user?.country, phone
    ];
    const filled = fields.filter(Boolean).length;
    return Math.floor((filled / fields.length) * 100);
  };

  const pieData = {
    labels: ['Complete', 'Incomplete'],
    datasets: [
      {
        data: [calculateProfileCompletion(), 100 - calculateProfileCompletion()],
        backgroundColor: ['#28a745', '#e0e0e0'],
        borderWidth: 1,
      }
    ]
  };

  const addQualification = () => setQualifications([...qualifications, { university: '', year: '', course: '' }]);
  const addExperience = () => setExperiences([...experiences, { company: '', from: '', to: '', role: '' }]);

  return (
    <div>
      <Navbar className={'contact-navbar'}/> 
      <Container fluid className="dashboard-container">
        <Row>
        <Col md={2} className="sidebar full-height">
          <Nav className="flex-column">
            <Nav.Link
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'jobs'}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'messages'}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </Nav.Link>
          </Nav>
        </Col>


          <Col md={10}>
            <Tab.Content>
              {activeTab === 'dashboard' && (
                <Row className="mt-4">
                  <Col md={6}>
                    <Card>
                      <Card.Body>
                        <h5>Profile Completion</h5>
                        <div className="chart-container" onClick={() => setActiveTab('profile')}>
                          <Pie data={pieData} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      <Card.Body>
                        <h5>Message Notification</h5>
                        <Alert variant="info">No new message</Alert>
                      </Card.Body>
                    </Card>
                    <Card className="mt-3">
                      <Card.Body>
                        <h5>New Job Alert</h5>
                        <p>Check the "Jobs" tab to explore opportunities!</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}

              {activeTab === 'jobs' && (
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Available Jobs</h5>
                    <Accordion>
                      {jobList.map((job, index) => (
                        <Accordion.Item eventKey={String(index)} key={job.id}>
                          <Accordion.Header>{job.title}</Accordion.Header>
                          <Accordion.Body>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Introduction:</strong> {job.introduction}</p>
                            <p><strong>Role:</strong> {job.role}</p>
                            <p><strong>Qualification:</strong> {job.qualification}</p>
                            <Button variant="primary">Apply</Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'messages' && (
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Messages</h5>
                    <ChatBox user={user} />
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'profile' && (
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Profile</h5>
                    <Form>
                      <Row>
                        <Col md={6}><Form.Group><Form.Label>First Name</Form.Label><Form.Control value={user.first_name} disabled /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Last Name</Form.Label><Form.Control value={user.last_name} disabled /></Form.Group></Col>
                      </Row>
                      <Form.Group className="mt-3"><Form.Label>Email</Form.Label><Form.Control value={user.email} disabled /></Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Gender</Form.Label><Form.Control value={user.gender} disabled /></Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Country</Form.Label><Form.Control value={user.country} disabled /></Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Phone</Form.Label><Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} /></Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Role</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                          <option value="JobSeeker">JobSeeker</option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="B2B">B2B</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Reset Password</Form.Label><Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Group>

                      <h6 className="mt-4">Qualifications</h6>
                      {qualifications.map((q, idx) => (
                        <Row key={idx} className="mb-2">
                          <Col md={4}><Form.Control placeholder="University" value={q.university} onChange={(e) => {
                            const updated = [...qualifications];
                            updated[idx].university = e.target.value;
                            setQualifications(updated);
                          }} /></Col>
                          <Col md={4}><Form.Control placeholder="Year" value={q.year} onChange={(e) => {
                            const updated = [...qualifications];
                            updated[idx].year = e.target.value;
                            setQualifications(updated);
                          }} /></Col>
                          <Col md={4}><Form.Control placeholder="Course" value={q.course} onChange={(e) => {
                            const updated = [...qualifications];
                            updated[idx].course = e.target.value;
                            setQualifications(updated);
                          }} /></Col>
                        </Row>
                      ))}
                      <Button onClick={addQualification} variant="outline-primary">+ Add Qualification</Button>

                      <h6 className="mt-4">Experience</h6>
                      {experiences.map((exp, idx) => (
                        <Row key={idx} className="mb-2">
                          <Col md={3}><Form.Control placeholder="Company" value={exp.company} onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].company = e.target.value;
                            setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="From" value={exp.from} onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].from = e.target.value;
                            setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="To" value={exp.to} onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].to = e.target.value;
                            setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="Role" value={exp.role} onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].role = e.target.value;
                            setExperiences(updated);
                          }} /></Col>
                        </Row>
                      ))}
                      <Button onClick={addExperience} variant="outline-primary">+ Add Experience</Button>

                      <Form.Group className="mt-4"><Form.Label>Upload CV (PDF)</Form.Label><Form.Control type="file" accept=".pdf" onChange={(e) => setCv(e.target.files[0])} /></Form.Group>
                      <Form.Group className="mt-3"><Form.Label>Upload Certificate (PDF)</Form.Label><Form.Control type="file" accept=".pdf" onChange={(e) => setCertificate(e.target.files[0])} /></Form.Group>

                      <div className="text-center mt-4">
                        <Button variant="success">Save Profile</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
