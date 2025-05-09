import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Card, ListGroup, Alert, Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import JobCreateForm from './JobCreateForm';
import { useLocation, useNavigate } from 'react-router-dom';

const JobsTab = () => {
  const [isLoadingApplicants, setIsLoadingApplicants] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState({ show: false, message: '' });
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplicants, setJobApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('list'); // list | jobDetails | applicants | applicantProfile | createJob
  const [message, setMessage] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showDocs, setShowDocs] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  useEffect(() => {
    // fetchLatestUser();
    fetchJobs();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabPath = params.get('tab');
    if (tabPath) {
      const [tab, jobSegment, applicantSegment] = tabPath.split('/');
      if (tab === 'jobs' && jobSegment?.startsWith('jobid=')) {
        const jobId = jobSegment.split('=')[1];
        const shouldShowApplicants = applicantSegment === 'applicants';

        const trySelectJob = async () => {
          const foundJob = jobs.find(j => j._id === jobId);
          if (foundJob) {
            setSelectedJob(foundJob);
            if (shouldShowApplicants) {
              await handleShowApplicants(foundJob);
            } else {
              setView('jobDetails');
            }
          }
        };

        trySelectJob();
      }
    }
  }, [location.search, jobs]);

  // const fetchLatestUser = async () => {
  //   console.log('inside fetchUser');
    
  //   try {
  //     const res = await fetch(`http://localhost:8001/private/api/v0/user/${user._id}`);
  //     const updatedUser = await res.json();
  //     if (res.ok) {
  //       // Option 1: If using Redux, dispatch an action to update the user
  //       // dispatch(updateUser(updatedUser)); 
  
  //       // Option 2: If using local state only, set directly (not ideal for Redux)
  //       console.log("Updated user data:", updatedUser);
  //     } else {
  //       console.error('Failed to fetch updated user');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching updated user:', err);
  //   }
  // };

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL+'/api/admin/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setView('jobDetails');
    navigate(`/admin-dashboard?tab=jobs/jobid=${job._id}`);
  };

  const handleShowApplicantsUI = async () => {
    try {
      setView('applicants');
      setIsLoadingApplicants(true);
      const res = await fetch(API_URL+`/api/admin/jobs/${selectedJob._id}/applicants`);
      const data = await res.json();
      setJobApplicants(data);
      navigate(`/admin-dashboard?tab=jobs/jobid=${selectedJob._id}/applicants`);
      
    } catch (err) {
      console.error('Error fetching applicants', err);
    }
    finally {
      setIsLoadingApplicants(false);
    }
  };

  const handleShowApplicants = async (job = selectedJob) => {
    try {
      debugger
      const job_id = job._id;
      setIsLoadingApplicants(true);
      // setSelectedJob(job);
      setView('applicants');
      const res = await fetch(`${API_URL}/api/admin/jobs/${job_id}/applicants`);
      const data = await res.json();
      setJobApplicants(data);
      
    } catch (err) {
      console.error('Error fetching applicants', err);
    } finally {
      setIsLoadingApplicants(false);
    }
  };
  

  const base64String = (arrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    uint8Array.forEach(byte => binary += String.fromCharCode(byte));
    return window.btoa(binary);
  };

  const handleApplicantClick = async (applicantId) => {
    try {
      const res = await fetch(API_URL+`/api/admin/applicants/${applicantId}`);
      const data = await res.json();
      setApplicantDetails(data);
      setView('applicantProfile');
      // navigate(`/admin-dashboard?tab=jobs/jobid=${selectedJob._id}/applicants/applicantProfile`);
    } catch (err) {
      console.error('Error fetching applicant profile', err);
    }
  };

  const handleBack = () => {
    if (view === 'applicantProfile') {
      setView('applicants');
      navigate(`/admin-dashboard?tab=jobs/jobid=${selectedJob._id}/applicants`);
    }
    else if (view === 'applicants') {
      setView('jobDetails');
      navigate(`/admin-dashboard?tab=jobs/jobid=${selectedJob._id}`);
    }
    else if (view === 'jobDetails') {
      setView('list');
      navigate(`/admin-dashboard?tab=jobs`);
    }
    else if (view === 'createJob') {
      setView('list');
      navigate(`/admin-dashboard?tab=jobs`);
    }
  };

  const handleJobCreated = () => {
    fetchJobs();
    setView('list');
    setMessage('Job created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDecision = async (type) => {
    const messageText =
      type === 'accept'
        ? 'You are selected for next round of interview'
        : 'Unfortunately, You are not selected for next round of interview';
  
    try {
      const res = await fetch(API_URL+`/private/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: applicantDetails._id,
          sender: 'admin',
          content: messageText,
          jobId: selectedJob._id
        })
      });
  
      if (res.ok) {
        // alert(`Applicant has been ${type === 'accept' ? 'selected' : 'rejected'} and notified.`);
        setAlertModal({ show: true, message: `Applicant has been ${type === 'accept' ? 'selected' : 'rejected'} and notified.` });
  
        await fetch(API_URL+'/private/api/notifications/userNotification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: applicantDetails._id,
            message: messageText
          })
        });
  
        // ✅ Update UI after response
        if (type === 'reject') {
          setJobApplicants(prev =>
            prev.filter(app => app._id !== applicantDetails._id)
          );
        } else if (type === 'accept') {
          setJobApplicants(prev =>
            prev.map(app =>
              app._id === applicantDetails._id
                ? {
                    ...app,
                    jobs_applied: app.jobs_applied.map(j =>
                      j._id?.toString() === selectedJob._id?.toString()
                        ? { ...j, status: 'selected' }
                        : j
                    )
                  }
                : app
            )
          );
        }
  
        setView('applicants');
      } else {
        // alert('Failed to send notification.');
        setAlertModal({ show: true, message: 'Failed to send notification.' });
      }
    } catch (err) {
      console.error('Decision error:', err);
      // alert('Server error');
      setAlertModal({ show: true, message: 'Server error' });
    }
  };
  

  return (
    <div className="p-3">
      {view !== 'list' && (
        <Button variant="link" className="p-0 mb-3" onClick={handleBack}>
          <ArrowLeft size={20} /> Back
        </Button>
      )}

      {view === 'list' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Job Manager</h4>
            <Button variant="primary" onClick={() => setView('createJob')}>+ Create Job</Button>
          </div>

          {message && (
            <Alert variant="success" className="text-center">
              {message}
            </Alert>
          )}

          <Card className="admin-job-list-card">
            <Card.Body>
              {jobs.length === 0 ? (
                <p className="text-center text-muted">No jobs posted yet.</p>
              ) : (
                <ListGroup variant="flush">
                  {jobs.map((job) => (
                    <ListGroup.Item
                      className="individual-job-admin py-3"
                      key={job._id}
                      action
                      onClick={() => handleJobClick(job)}
                      style={{
                        borderBottom: '1px solid #eee',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f9fa')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div className="fw-bold">{job.title}</div>
                      <div className="text-muted">{job.company}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </>
      )}


      {view === 'createJob' && (
        <JobCreateForm onJobCreated={handleJobCreated} />
      )}

      {view === 'jobDetails' && selectedJob && (
        <Card className="shadow-sm p-3">
          <h5>{selectedJob.title}</h5>
          <p><strong>Company:</strong> {selectedJob.company}</p>
          <p><strong>Description:</strong> {selectedJob.description}</p>
          <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
          <p><strong>Location:</strong> {selectedJob.location || 'Not specified'}</p>
          <div className="text-center my-3">
            <Button
              style={{ backgroundColor: '#4197f1', border: 'none', color: '#fff' }}
              size="sm"
              onClick={handleShowApplicantsUI}
            >
              Show Applicants
            </Button>
          </div>

        </Card>
      )}

{view === 'applicants' && (
  <>
    {isLoadingApplicants ? (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading applicants...</span>
        </div>
        <p className="mt-2">Loading applicants...</p>
      </div>
    ) : (
      <>
        <h5>Applicants</h5>
        {jobApplicants.length ? (
          <ListGroup>
            {jobApplicants.map((app) => {
              const jobApplication = app.jobs_applied?.find(j =>
                j._id?.toString() === selectedJob._id?.toString()
              );

              return (
                <ListGroup.Item
                  key={app._id}
                  action
                  onClick={() => handleApplicantClick(app._id)}
                  className="d-flex justify-content-between align-items-center admin-applicant-list"
                >
                  <span>{app.first_name} {app.last_name}</span>

                  {jobApplication?.status === 'pending' && (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                  {jobApplication?.status === 'selected' && (
                    <span className="badge bg-success">Selected</span>
                  )}
                  {jobApplication?.status === 'rejected' && (
                    <span className="badge bg-danger">Rejected</span>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>No applicants found for this job.</p>
        )}
      </>
    )}
  </>
)}






        {view === 'applicantProfile' && applicantDetails && (
          <Card className="p-4 shadow rounded-4">
            <div className="text-center mb-4">
              <h4 className="fw-bold">{applicantDetails.first_name} {applicantDetails.last_name}</h4>
              <p className="text-muted">{applicantDetails.role}</p>
            </div>

            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Gender:</strong> {applicantDetails.gender}</p>
              </Col>
              <Col md={6}>
                <p><strong>Country:</strong> {applicantDetails.country}</p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Email:</strong> {applicantDetails.email}</p>
              </Col>
              <Col md={6}>
                <p><strong>Phone:</strong> {applicantDetails.phone}</p>
              </Col>
            </Row>

            <hr />

            <div className="mb-4">
              <h5 className="fw-bold">Qualifications</h5>
              {applicantDetails.qualification.length > 0 ? (
                <ListGroup variant="flush">
                  {applicantDetails.qualification.map((q, idx) => (
                    <ListGroup.Item key={idx}>
                      {q.university} — {q.course} ({q.year})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : <p className="text-muted">No qualifications added</p>}
            </div>

            <div className="mb-4">
              <h5 className="fw-bold">Experience</h5>
              {applicantDetails.experience.length > 0 ? (
                <ListGroup variant="flush">
                  {applicantDetails.experience.map((exp, idx) => (
                    <ListGroup.Item key={idx}>
                      {exp.company} — {exp.role} ({exp.from} - {exp.to})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : <p className="text-muted">No experiences added</p>}
            </div>

            {(applicantDetails.cv || applicantDetails.certificate) && (
              <div className="text-center mb-4 d-flex justify-content-center gap-3 flex-wrap">
                {applicantDetails.cv && (
                  <Button
                    style={{ backgroundColor: '#4197f1', border: 'none', color: '#fff' }}
                    size="sm"
                    onClick={() => setShowDocs('cv')}
                  >
                    View CV
                  </Button>
                )}
                {applicantDetails.certificate && (
                  <Button
                    style={{ backgroundColor: '#4197f1', border: 'none', color: '#fff' }}
                    size="sm"
                    onClick={() => setShowDocs('certificate')}
                  >
                    View Certificate
                  </Button>
                )}
              </div>
            )}

            {(() => {
              const application = applicantDetails.jobs_applied?.find(
                j => j._id?.toString() === selectedJob._id?.toString() && j.status === 'pending'
              );
              return application ? (
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button variant="success" onClick={() => handleDecision('accept')}>Accept</Button>
                  <Button variant="danger" onClick={() => handleDecision('reject')}>Reject</Button>
                </div>
              ) : null;
            })()}

            {/* Modal for CV or Certificate */}
            <Modal show={!!showDocs} onHide={() => setShowDocs(null)} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>{showDocs === 'cv' ? 'CV Preview' : 'Certificate Preview'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {showDocs === 'cv' && applicantDetails.cv && (
                  <embed
                    src={`data:${applicantDetails.cv.contentType};base64,${base64String(applicantDetails.cv.data.data)}`}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                )}
                {showDocs === 'certificate' && applicantDetails.certificate && (
                  <embed
                    src={`data:${applicantDetails.certificate.contentType};base64,${base64String(applicantDetails.certificate.data.data)}`}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                )}
              </Modal.Body>
            </Modal>
          </Card>
        )}
        <Modal
          show={alertModal.show}
          onHide={() => setAlertModal({ show: false, message: '' })}
          centered
          contentClassName="text-center border-0"
        >
          <Modal.Header className="border-0 justify-content-center"></Modal.Header>

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

export default JobsTab;
