import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import JobsTab from './Tabs/JobsTab';
import NotificationsTab from './Tabs/NotificationsTab';
import FreelancersTab from './Tabs/FreelancersTab';
import MessagesTab from './Tabs/MessagesTab';
import ProfileTab from './Tabs/ProfileTab';
import B2BTab from './Tabs/B2BTab';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('notifications');
  const [jobId, setJobId] = useState(null);
  const [viewApplicants, setViewApplicants] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabPath = params.get('tab');
    if (!tabPath) return;

    const [tab, jobSegment, applicantSegment] = tabPath.split('/');
    setActiveTab(tab);

    const jobIdFromURL = jobSegment?.startsWith('jobid=') ? jobSegment.split('=')[1] : null;
    setJobId(jobIdFromURL);
    setViewApplicants(applicantSegment === 'applicants');
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setJobId(null);
    setViewApplicants(false);
    navigate(`/admin-dashboard?tab=${tab}`);
  };

  const handleNavigateToJob = (jobId) => {
    navigate(`/admin-dashboard?tab=jobs/jobid=${jobId}`);
  };

  const handleNavigateToApplicants = (jobId) => {
    navigate(`/admin-dashboard?tab=jobs/jobid=${jobId}/applicants`);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobsTab jobId={jobId} viewApplicants={viewApplicants} navigate={navigate} />;
      case 'notifications':
        return <NotificationsTab navigate={navigate} />;
      case 'freelancers':
        return <FreelancersTab />;
      case 'messages':
        return <MessagesTab />;
      case 'profile':
        return <ProfileTab />;
      case 'b2b':
        return <B2BTab />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="admin-dashboard-container">
      <Row>
        <Col md={2} className="admin-sidebar">
          <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={handleTabChange}>
            <Nav.Item><Nav.Link eventKey="notifications">Notifications</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="jobs">Jobs</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="freelancers">Freelancers</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="messages">Messages</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="profile">Profile</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="b2b">B2B</Nav.Link></Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="admin-main">
          {renderTab()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
