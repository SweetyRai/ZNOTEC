import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import JobCreateForm from './JobCreateForm';

const JobsTab = () => {
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
  };

  const handleShowApplicants = async () => {
    try {
      const res = await fetch(`http://localhost:8001/api/admin/jobs/${selectedJob._id}/applicants`);
      const data = await res.json();
      setJobApplicants(data);
      setView('applicants');
    } catch (err) {
      console.error('Error fetching applicants', err);
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
      const res = await fetch(`http://localhost:8001/api/admin/applicants/${applicantId}`);
      const data = await res.json();
      setApplicantDetails(data);
      setView('applicantProfile');
    } catch (err) {
      console.error('Error fetching applicant profile', err);
    }
  };

  const handleBack = () => {
    if (view === 'applicantProfile') setView('applicants');
    else if (view === 'applicants') setView('jobDetails');
    else if (view === 'jobDetails') setView('list');
    else if (view === 'createJob') setView('list');
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
      const res = await fetch(`http://localhost:8001/private/api/messages/send`, {
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
        alert(`Applicant has been ${type === 'accept' ? 'selected' : 'rejected'} and notified.`);
  
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
        alert('Failed to send notification.');
      }
    } catch (err) {
      console.error('Decision error:', err);
      alert('Server error');
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Job Manager</h4>
            <Button variant="primary" onClick={() => setView('createJob')}>Create Job</Button>
          </div>
          {message && <Alert variant="success">{message}</Alert>}
          <ListGroup>
            {jobs.map((job) => (
              <ListGroup.Item key={job._id} action onClick={() => handleJobClick(job)}>
                <strong>{job.title}</strong> — {job.company}
              </ListGroup.Item>
            ))}
          </ListGroup>
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
          <Button variant="info" onClick={handleShowApplicants}>Show Applicants</Button>
        </Card>
      )}

{view === 'applicants' && (
  <>
    <h5>Applicants</h5>
    {jobApplicants.length ? (
      <ListGroup>
        {jobApplicants.map((app) => {
          // Make sure both IDs are strings before comparing
          console.log(app.first_name, app);

          const jobApplication = app.jobs_applied?.find(j =>
            
            j._id?.toString() === selectedJob._id?.toString()
          );

          return (
            <ListGroup.Item
              key={app._id}
              action
              onClick={() => handleApplicantClick(app._id)}
              className="d-flex justify-content-between align-items-center"
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





      {view === 'applicantProfile' && applicantDetails && (
        <Card className="p-3 shadow-sm">
          <h5>{applicantDetails.first_name} {applicantDetails.last_name}</h5>
          <p><strong>Gender:</strong> {applicantDetails.gender}</p>
          <p><strong>Role:</strong> {applicantDetails.role}</p>
          <p><strong>Country:</strong> {applicantDetails.country}</p>
          <p><strong>Email:</strong> {applicantDetails.email}</p>
          <p><strong>Phone:</strong> {applicantDetails.phone}</p>

          <h6>Qualification</h6>
          {applicantDetails.qualification.map((q, idx) => (
            <p key={idx}>
              {q.university}, {q.course} ({q.year})
            </p>
          ))}

          <h6>Experience</h6>
          {applicantDetails.experience.map((exp, idx) => (
            <p key={idx}>
              {exp.company_name}, {exp.role} ({exp.from} - {exp.to})
            </p>
          ))}

          {(applicantDetails.cv || applicantDetails.certificate) && (
            <div className="mt-3">
              <Button variant="info" onClick={() => setShowDocs(true)}>
                View CV & Cover Letter
              </Button>
            </div>
          )}


          {/* {selectedJob?.applicants?.includes(applicantDetails._id) &&
            applicantDetails.jobs_applied?.some(j => j.status === 'pending') && (
              <div className="d-flex gap-2 mt-4">
                <Button variant="success" onClick={() => handleDecision('accept')}>Accept</Button>
                <Button variant="danger" onClick={() => handleDecision('reject')}>Reject</Button>
              </div>
          )} */}

{(() => {
  const application = applicantDetails.jobs_applied?.find(
    j => j._id?.toString() === selectedJob._id?.toString() && j.status === 'pending'
  );

  return application ? (
    <div className="d-flex gap-2 mt-4">
      <Button variant="success" onClick={() => handleDecision('accept')}>Accept</Button>
      <Button variant="danger" onClick={() => handleDecision('reject')}>Reject</Button>
    </div>
  ) : null;
})()}



          <Modal show={showDocs} onHide={() => setShowDocs(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Applicant Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {applicantDetails.cv && (
              <div className="mb-4">
                <h6>CV</h6>
                <embed
                  src={`data:${applicantDetails.cv.contentType};base64,${base64String(applicantDetails.cv.data.data)}`}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              </div>
            )}

            {applicantDetails.certificate && (
              <div>
                <h6>Cover Letter / Certificate</h6>
                <embed
                  src={`data:${applicantDetails.certificate.contentType};base64,${base64String(applicantDetails.certificate.data.data)}`}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              </div>
            )}
            </Modal.Body>
          </Modal>
        </Card>
      )}
    </div>
  );
};

export default JobsTab;
