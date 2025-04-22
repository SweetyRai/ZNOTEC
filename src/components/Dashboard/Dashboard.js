import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { Badge } from 'react-bootstrap';
import {
  Container, Row, Col, Nav, Tab, Card, Accordion,
  Button, Form, Alert, Modal
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChatBox from './ChatBox';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { tab } = useParams();
  const [showDocs, setShowDocs] = useState(null); // 'cv' or 'certificate'
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || 'home');
  const { user } = useSelector(state => state.user); 
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState(user?.role);
  const [qualifications, setQualifications] = useState([{ university: '', year: '', course: '' }]);
  const [experiences, setExperiences] = useState([{ company: '', from: '', to: '', role: '' }]);
  const [cv, setCv] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageError, setMessageError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();

  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  const [cvPreviewUrl, setCvPreviewUrl] = useState(null);
  const [certificatePreviewUrl, setCertificatePreviewUrl] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.qualification?.length) setQualifications(user.qualification);
      if (user.experience?.length) setExperiences(user.experience);
      if (user.cv) setCv(user.cv);
      if (user.certificate) setCertificate(user.certificate);
    }
    // if (user?._id) {
    //   fetchLatestUser();
    //   fetchMessages();
    // }
    
    fetchJobs();
    
    const userInterval = setInterval(fetchUserByEmail, 5000);
    const interval = setInterval(fetchMessages, 90000);
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
    return () => clearInterval(userInterval, interval);
    
  }, [tab]);
  
  

  const fetchUserByEmail = async () => {
  console.log('email->', user);
  
    try {
      const res = await fetch(API_URL+'/private/api/user-by-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // You may already have the token in sessionStorage
        const token = sessionStorage.getItem('token');
  
        // Dispatch updated user to Redux
        dispatch(setUser({ user: data, token }));
        
        console.log('Redux updated with new user data:', data);
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (err) {
      console.error('Fetch user error:', err);
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'messages') setUnreadCount(0); // reset count on view
    navigate(`/dashboard/${tabName}`);
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL+'/public/api/v0/jobs');
      const data = await res.json();
      if (res.ok) setJobs(data);
    } catch (err) {
      console.error('Fetch jobs error:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:8001/api/messages/${user._id}`);
      const data = await res.json();
      if (res.ok) {
        setUnreadCount(data.length - messages.length);
        setMessages(data);
      } else {
        setMessageError(data.message || 'Error loading messages');
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
      setMessageError('Server error');
    }
  };

  const handleApply = async (jobId) => {
    try {
      const res = await fetch(`http://localhost:8001/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, jobId })
      });
      const data = await res.json();
      if (res.ok) alert('Successfully applied!');
      else alert(data.message || 'Failed to apply.');
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('role', role);
      formData.append('qualification', JSON.stringify(qualifications));
      formData.append('experience', JSON.stringify(experiences));
      if (cv) formData.append('cv', cv);
      if (certificate) formData.append('certificate', certificate);

      const res = await fetch(`http://localhost:8001/private/api/update-profile/${user._id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();
      if (res.ok) alert('Profile updated successfully!');
      else alert(data.message || 'Failed to update profile');
    } catch (err) {
      alert('Something went wrong. Try again.');
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [user?.first_name, user?.last_name, user?.email, user?.gender, user?.country, phone];
    const filled = fields.filter(Boolean).length;
    return Math.floor((filled / fields.length) * 100);
  };

  const pieData = {
    labels: ['Complete', 'Incomplete'],
    datasets: [{
      data: [calculateProfileCompletion(), 100 - calculateProfileCompletion()],
      backgroundColor: ['#28a745', '#e0e0e0'],
      borderWidth: 1,
    }]
  };

  const addQualification = () => setQualifications([...qualifications, { university: '', year: '', course: '' }]);
  const addExperience = () => setExperiences([...experiences, { company: '', from: '', to: '', role: '' }]);

  return (
    <div>
      <Navbar className={'contact-navbar'} />
      <Container fluid className="dashboard-container">
        <Row>
          <Col md={2} className="sidebar full-height">
            <Nav className="flex-column">
              <Nav.Link active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')}>Dashboard</Nav.Link>
              <Nav.Link active={activeTab === 'jobs'} onClick={() => handleTabChange('jobs')}>Jobs</Nav.Link>
              <Nav.Link active={activeTab === 'messages'} onClick={() => handleTabChange('messages')}>
                Messages {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount}</span>}
              </Nav.Link>
              <Nav.Link active={activeTab === 'profile'} onClick={() => handleTabChange('profile')}>Profile</Nav.Link>
            </Nav>
          </Col>

          <Col md={12}>
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
                    <Card className='dashboard-card'>
                      <Card.Body>
                        <h5>Message Notification</h5>
                        {messageError ? (
                          <Alert variant="danger">{messageError}</Alert>
                        ) : messages.length === 0 ? (
                          <Alert variant="info">No new message</Alert>
                        ) : (
                          <ul>{messages.map((msg, i) => (<li key={i}>{msg.content}</li>))}</ul>
                        )}
                      </Card.Body>
                    </Card>
                    <Card className="mt-3 dashboard-card job-alert-card">
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
        {jobs.map((job, index) => {
          const application = user.jobs_applied?.find(
            j => j._id?.toString() === job._id?.toString()
          );

          const status = application?.status;

          return (
            <Accordion.Item eventKey={String(index)} key={job._id}>
              <Accordion.Header>
                {job.title}
                {status === 'pending' && (
                  <span className="badge bg-info text-dark ms-2">Applied</span>
                )}
                {status === 'selected' && (
                  <span className="badge bg-success ms-2">Selected</span>
                )}
                {status === 'rejected' && (
                  <span className="badge bg-danger ms-2">Rejected</span>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Introduction:</strong> {job.introduction}</p>
                <p><strong>Role:</strong> {job.role}</p>
                <p><strong>Qualification:</strong> {job.qualification}</p>

                {status ? (
                  <p className={`fw-bold text-${status === 'selected' ? 'success' : status === 'rejected' ? 'danger' : 'info'}`}>
                    You have already applied.
                  </p>
                ) : (
                  <Button variant="primary" onClick={() => handleApply(job._id)}>Apply</Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
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
                      {/* <Form.Group className="mt-3"><Form.Label>Reset Password</Form.Label><Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Group> */}

                      <h6 className="mt-4">Qualifications</h6>
                      {qualifications.map((q, idx) => (
                        <Row key={idx} className="mb-2">
                          <Col md={4}><Form.Control placeholder="University" value={q.university} onChange={(e) => {
                            const updated = [...qualifications]; updated[idx].university = e.target.value; setQualifications(updated);
                          }} /></Col>
                          <Col md={4}><Form.Control placeholder="Year" value={q.year} onChange={(e) => {
                            const updated = [...qualifications]; updated[idx].year = e.target.value; setQualifications(updated);
                          }} /></Col>
                          <Col md={4}><Form.Control placeholder="Course" value={q.course} onChange={(e) => {
                            const updated = [...qualifications]; updated[idx].course = e.target.value; setQualifications(updated);
                          }} /></Col>
                        </Row>
                      ))}
                      <Button onClick={addQualification} variant="outline-primary">+ Add Qualification</Button>

                      <h6 className="mt-4">Experience</h6>
                      {experiences.map((exp, idx) => (
                        <Row key={idx} className="mb-2">
                          <Col md={3}><Form.Control placeholder="Company" value={exp.company} onChange={(e) => {
                            const updated = [...experiences]; updated[idx].company = e.target.value; setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="From" value={exp.from} onChange={(e) => {
                            const updated = [...experiences]; updated[idx].from = e.target.value; setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="To" value={exp.to} onChange={(e) => {
                            const updated = [...experiences]; updated[idx].to = e.target.value; setExperiences(updated);
                          }} /></Col>
                          <Col md={3}><Form.Control placeholder="Role" value={exp.role} onChange={(e) => {
                            const updated = [...experiences]; updated[idx].role = e.target.value; setExperiences(updated);
                          }} /></Col>
                        </Row>
                      ))}
                      <Button onClick={addExperience} variant="outline-primary">+ Add Experience</Button>

                      {/* === Upload CV === */}
                      <Form.Group className="mt-4">
                        <Form.Label>Upload CV (PDF)</Form.Label>
                        <Form.Control
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setCv(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => setCvPreviewUrl(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Form.Group>

                      {cvPreviewUrl && (
                        <div className="mt-2">
                          <h6>New CV Preview</h6>
                          <embed src={cvPreviewUrl} type="application/pdf" width="100%" height="300px" />
                        </div>
                      )}

                      {/* === Upload Certificate === */}
                      <Form.Group className="mt-3">
                        <Form.Label>Upload Certificate (PDF)</Form.Label>
                        <Form.Control
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setCertificate(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => setCertificatePreviewUrl(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Form.Group>

                      {certificatePreviewUrl && (
                        <div className="mt-2">
                          <h6>New Certificate Preview</h6>
                          <embed src={certificatePreviewUrl} type="application/pdf" width="100%" height="300px" />
                        </div>
                      )}


                      <div className="text-center mt-4">
                        <Button variant="success" onClick={handleSaveProfile}>Save Profile</Button>
                      </div>
                    </Form>

                    <Modal show={!!showDocs} onHide={() => setShowDocs(null)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>{showDocs === 'cv' ? 'CV Preview' : 'Certificate Preview'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {showDocs && user[showDocs] && (
      <embed
        src={`data:${user[showDocs].contentType};base64,${btoa(
          new Uint8Array(user[showDocs].data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )}`}
        type="application/pdf"
        width="100%"
        height="500px"
      />
    )}
  </Modal.Body>
</Modal>

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
