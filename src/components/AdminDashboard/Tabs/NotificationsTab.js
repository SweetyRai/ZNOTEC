import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/admin/notifications`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setNotifications(sorted);
      });
  }, [API_URL]);

  const handleApplicantClick = (notification) => {
    if (notification.relatedJobId) {
      // console.log('notification.relatedJobId->', notification.relatedJobId._id);
      
      navigate(`/admin-dashboard?tab=jobs/jobid=${notification.relatedJobId._id}/applicants`);
    }
  };

  const applicantNotifications = notifications.filter(n => n.relatedJobId).slice(0, 5);
  const messageNotifications = notifications.filter(n => !n.relatedJobId).slice(0, 5);

  return (
    <div className="row g-4">
      {/* Applicant Notifications */}
      <div className="col-12 col-md-6">
        <Card className="shadow-sm h-100 notification-cards">
          <Card.Header className="fw-bold">Latest Job Applicants</Card.Header>
          <Card.Body className="p-0">
            {applicantNotifications.length === 0 ? (
              <p className="text-muted p-3">No new applicants</p>
            ) : (
              <ListGroup variant="flush">
                {applicantNotifications.map((n, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => handleApplicantClick(n)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {n.message}
                    <Badge bg="info">{n.senderRole}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <div className="text-center my-2">
              <Button variant="link" size="sm" onClick={() => navigate('/admin-dashboard?tab=jobs')}>
                View All Applicants
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Message Notifications */}
      <div className="col-12 col-md-6">
        <Card className="shadow-sm h-100">
          <Card.Header className="fw-bold">Latest Messages</Card.Header>
          <Card.Body className="p-0">
            {messageNotifications.length === 0 ? (
              <p className="text-muted p-3">No new messages</p>
            ) : (
              <ListGroup variant="flush">
                {messageNotifications.map((n, idx) => (
                  <ListGroup.Item
                    key={idx}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {n.message}
                    <Badge bg="secondary">{n.senderRole}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <div className="text-center my-2">
              <Button variant="link" size="sm" onClick={() => navigate('/admin-dashboard?tab=messages')}>
                View All Messages
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsTab;
