import React, { useEffect, useState } from 'react';
import { Alert, ListGroup } from 'react-bootstrap';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  useEffect(() => {
    fetch(API_URL+'/api/admin/notifications')
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  return (
    <div>
      <h4>Notifications</h4>
      {notifications.length === 0 ? (
        <Alert variant="info">No new notifications</Alert>
      ) : (
        <ListGroup>
          {notifications.map((n, idx) => (
            <ListGroup.Item key={idx}>{n.message}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NotificationsTab;
