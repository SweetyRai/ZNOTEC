import React, { useState, useEffect, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { setTotalMessages, setNewMessages, resetNewMessages } from '../../redux/notificationSlice';
import { setMessages, clearNewMessages } from '../../redux/notificationSlice';
import { Badge } from 'react-bootstrap';
import {
  Container, Row, Col, Nav, Tab, Card, Accordion,
  Button, Form, Alert, Modal, ListGroup 
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChatBox from './ChatBox';
import Navbar from '../Navbar/Navbar';
import ProjectsTab from './ProjectsTab';
import EmployeesTab from './EmployeesTab';
import './Dashboard.css';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [savingProfile, setSavingProfile] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [latestJobTitle, setLatestJobTitle] = useState(null);
  const [jobAlertMessage, setJobAlertMessage] = useState('');
  const [hasViewedMessages, setHasViewedMessages] = useState(false);
  const [initialMessageCount, setInitialMessageCount] = useState(0);
  const [messageIdsSeen, setMessageIdsSeen] = useState([]);
  const [todayJobs, setTodayJobs] = useState([]);
  const seenMessageIdsRef = useRef([]);
  const [alertModal, setAlertModal] = useState({
    show: false,
    message: ''
  });






  const { tab } = useParams();
  const [showDocs, setShowDocs] = useState(null); // 'cv' or 'certificate'
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || 'home');
  const { user } = useSelector(state => state.user); 
  const { totalMessages, newMessages } = useSelector(state => state.notification);
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
      // Qualifications
      if (user.qualification?.length)
        setQualifications(JSON.parse(JSON.stringify(user.qualification)));
  
      // Experiences
      if (user.experience?.length)
        setExperiences(JSON.parse(JSON.stringify(user.experience)));
  
      // CV setup
      if (user.cv && user.cv.data) {
        setCv(user.cv);
        const base64CV = `data:${user.cv.contentType};base64,${btoa(
          new Uint8Array(user.cv.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )}`;
        setCvPreviewUrl(base64CV);
      }
  
      // Certificate setup
      if (user.certificate && user.certificate.data) {
        setCertificate(user.certificate);
        const base64Cert = `data:${user.certificate.contentType};base64,${btoa(
          new Uint8Array(user.certificate.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )}`;
        setCertificatePreviewUrl(base64Cert);
      }
    }
    fetchJobs(); // initial call
    fetchMessages(); // initial call
    
    const jobInterval = setInterval(fetchJobs, 90000);
    
    const interval = setInterval(fetchMessages, 80000);

    const profileInterval = setInterval(fetchUserByEmail, 50000);

    
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
    // return () => clearInterval( interval, jobInterval);
    
  }, []);
  
  
  const fetchUserByEmail = async () => {
  console.log('email->', user);
  
    try {
      const res = await fetch(API_URL+'/private/api/user-by-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
  
      const data = await res.json();

      console.log('data->', data);
      
  
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
    navigate(`/dashboard/${tabName}`);

    if (tabName === 'messages') {
      dispatch(resetNewMessages());
    }
  
    if (tabName === 'messages') {
      setHasViewedMessages(true);
      setUnreadCount(0);
    }
  };
  

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL + '/public/api/v0/jobs');
      const data = await res.json();
  
      if (res.ok) {
        setJobs(data);
  
        // Filter jobs created today
        const today = new Date().toDateString();
        const jobsToday = data.filter(job => {
          const jobDate = new Date(job.createdAt).toDateString();
          return jobDate === today;
        });
  
        setTodayJobs(jobsToday);
      }
    } catch (err) {
      console.error('Fetch jobs error:', err);
      setJobAlertMessage('Error fetching job info.');
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/private/api/messages/${user._id}`);
      const data = await res.json();
  
      if (res.ok) {
        setMessages(data);
  
        if (totalMessages > 0 && data.length > totalMessages) {
          dispatch(setNewMessages(data.length - totalMessages));
        }
  
        dispatch(setTotalMessages(data.length));
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
      setMessageError('Server error');
    }
  };
    

  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId); // Start loading
      const res = await fetch(API_URL+`/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, jobId })
      });
      const data = await res.json();
      if (res.ok) {
        setAlertModal({ show: true, message: "Successfully applied!" });
        fetchUserByEmail();
      }
      else setAlertModal({ show: true, message: data.message || 'Failed to apply.' });
    } catch (err) {
      setAlertModal({ show: true, message: 'Something went wrong. Please try again.' });
    }
    finally {
      setApplyingJobId(null); // Stop loading
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('role', role);
      formData.append('qualification', JSON.stringify(qualifications));
      formData.append('experience', JSON.stringify(experiences));
      if (cv) formData.append('cv', cv);
      if (certificate) formData.append('certificate', certificate);

      console.log('formData->', formData);
      

      const res = await fetch(API_URL+`/private/api/update-profile/${user._id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        fetchUserByEmail();
        setAlertModal({ show: true, message: 'Profile updated successfully!' });
      }
      else setAlertModal({ show: true, message: data.message || 'Failed to update profile' });
    } catch (err) {
      setAlertModal({ show: true, message: 'Something went wrong. Try again.' });
    }
    finally {
      setSavingProfile(false); // Stop loading
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [
      user?.first_name,
      user?.last_name,
      user?.email,
      user?.gender,
      user?.country,
      phone
    ];
  
    let filledCount = fields.filter(Boolean).length;
    let totalCount = fields.length;
  
    // Check if at least one qualification has meaningful data
    const hasQualification = Array.isArray(qualifications) &&
      qualifications.some(q => q.university || q.year || q.course);
    if (hasQualification) filledCount += 1;
    totalCount += 1;
  
    // Check if at least one experience has meaningful data
    const hasExperience = Array.isArray(experiences) &&
      experiences.some(e => e.company || e.from || e.to || e.role);
    if (hasExperience) filledCount += 1;
    totalCount += 1;
  
    // Check if CV is uploaded
    if (cv) {
      filledCount += 1;
      totalCount += 1;
    }
  
    // Check if Certificate is uploaded
    if (certificate) {
      filledCount += 1;
      totalCount += 1;
    }
  
    return Math.floor((filledCount / totalCount) * 100);
  };

  const profilePercent = calculateProfileCompletion();

const pieData = {
  labels: ['Completed', 'Remaining'],
  datasets: [{
    data: [profilePercent, 100 - profilePercent],
    backgroundColor: ['#198754', '#f0f0f0'], // success green + light gray
    borderColor: ['#198754', '#f0f0f0'],
    borderWidth: 1
  }]
};
  

  // const calculateProfileCompletion = () => {
  //   const fields = [user?.first_name, user?.last_name, user?.email, user?.gender, user?.country, phone];
  //   const filled = fields.filter(Boolean).length;
  //   return Math.floor((filled / fields.length) * 100);
  // };

  // const pieData = {
  //   labels: ['Complete', 'Incomplete'],
  //   datasets: [{
  //     data: [calculateProfileCompletion(), 100 - calculateProfileCompletion()],
  //     backgroundColor: ['#28a745', '#e0e0e0'],
  //     borderWidth: 1,
  //   }]
  // };

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
                Messages {(!hasViewedMessages && unreadCount > 0) && (
                  <span className="badge bg-danger ms-2">{unreadCount}</span>
                )}
              </Nav.Link>

              <Nav.Link active={activeTab === 'profile'} onClick={() => handleTabChange('profile')}>Profile</Nav.Link>
              {user?.role === 'B2B' && (
              <>
                <Nav.Link active={activeTab === 'projects'} onClick={() => handleTabChange('projects')}>Projects</Nav.Link>
                <Nav.Link active={activeTab === 'employees'} onClick={() => handleTabChange('employees')}>Employees</Nav.Link>
              </>
            )}
            </Nav>
          </Col>

          <Col md={12}>
            <Tab.Content className={activeTab === 'profile' ? 'user-card-view' : ''}>
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
                  <Card className='dashboard-card user-notification'>
                    <Card.Body>
                      <h5>Message Notification</h5>

                      {messageError ? (
                        <Alert variant="danger">{messageError}</Alert>
                      ) : messages.length === 0 ? (
                        <Alert variant="info">No new message</Alert>
                      ) : (
                        <ListGroup variant="flush" className='msg-notification'>
                          {[...messages].slice(-5).reverse().map((msg, i) => (
                            <ListGroup.Item
                              key={msg._id}
                              style={{
                                backgroundColor: i < newMessages ? '#f0f2f4' : 'transparent',
                                fontWeight: i < newMessages ? 'bold' : 'normal',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleTabChange('messages')}
                            >
                              <strong>From:</strong> {msg.sender || 'Admin'}<br />
                              <span>{msg.content.length > 80 ? msg.content.slice(0, 80) + '...' : msg.content}</span>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>

                      )}
                    </Card.Body>
                  </Card>



                  <Card className="mt-3 dashboard-card job-alert-card job-list">
                  <Card.Body>
                      <h5>New Job Alerts</h5>

                      {!Array.isArray(jobs) || jobs.length === 0 ? (
                        <Alert variant="info">No new job posted</Alert>
                      ) : (
                        <ListGroup variant="flush" className='job-notification'>
                          {[...jobs].slice(-5).reverse().map((job, i) => (
                            <ListGroup.Item className='individual-job'
                              key={job._id || i}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleTabChange('jobs')}
                            >
                              <strong>{job.title}</strong> at {job.company}<br />
                              <small className="text-muted">
                                {job.introduction?.length > 70
                                  ? job.introduction.slice(0, 70) + '...'
                                  : job.introduction}
                              </small>
                            </ListGroup.Item>
                          ))}
                          {jobs.length > 5 && (
                            <Button
                              variant="link"
                              className="mt-2 p-0"
                              onClick={() => handleTabChange('jobs')}
                            >
                              View all jobs
                            </Button>
                          )}
                        </ListGroup>
                      )}
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
                              <p><strong>Description:</strong> {job.description}</p>
                              <p><strong>Location:</strong> {job.location}</p>
                              <p><strong>Qualification:</strong> {job.qualification}</p>

                              {status ? (
                                <p className={`fw-bold text-${status === 'selected' ? 'success' : status === 'rejected' ? 'danger' : 'info'}`}>
                                  You have already applied.
                                </p>
                              ) : (
                                <Button
                                  variant="primary"
                                  disabled={applyingJobId === job._id}
                                  onClick={() => handleApply(job._id)}
                                >
                                  {applyingJobId === job._id ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                      Applying...
                                    </>
                                  ) : 'Apply'}
                                </Button>
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
                        {cv && (
                          <div className="mt-2 text-muted">
                            <small>Selected: {cv.name || 'cv.pdf'}</small>
                          </div>
                        )}
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
                        {certificate && (
                          <div className="mt-2 text-muted">
                            <small>Selected: {certificate.name || 'certificate.pdf'}</small>
                          </div>
                        )}
                      </Form.Group>

                      {certificatePreviewUrl && (
                        <div className="mt-2">
                          <h6>New Certificate Preview</h6>
                          <embed src={certificatePreviewUrl} type="application/pdf" width="100%" height="300px" />
                        </div>
                      )}


                    <div className="text-center mt-4">
                      <Button  
                      style={{ backgroundColor: '#4197f1', border: 'none', color: '#fff' }}
                      size="sm"
                      onClick={handleSaveProfile} disabled={savingProfile}>
                        {savingProfile ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Saving...
                          </>
                        ) : (
                          'Save Profile'
                        )}
                      </Button>
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

              {activeTab === 'projects' && user?.role === 'B2B' && (
                <ProjectsTab user={user} />
              )}

              {activeTab === 'employees' && user?.role === 'B2B' && (
                <EmployeesTab user={user} />
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Container>

      <Modal
        show={alertModal.show}
        onHide={() => setAlertModal({ show: false, message: '' })}
        centered
        contentClassName="text-center border-0"
      >
        <Modal.Header className="border-0 justify-content-center">
          {/* <Modal.Title className="w-100">Notification</Modal.Title> */}
        </Modal.Header>

        <Modal.Body className="border-0">
          <p className="mb-0">{alertModal.message}</p>
        </Modal.Body>

        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="primary" onClick={() => setAlertModal({ show: false, message: '' })}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default Dashboard;
