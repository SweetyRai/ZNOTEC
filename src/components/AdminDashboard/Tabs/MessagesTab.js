import React, { useEffect, useState } from 'react';
import { ListGroup, Form, Button, Card, Row, Col } from 'react-bootstrap';

const MessagesTab = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchUsersWithMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/messages/all`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected array from API, got:', data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/messages/conversation/${userId}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchMessages(user.userId);
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedUser) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/messages/send-from-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: selectedUser.userId,
          content: newMsg
        })
      });

      if (res.ok) {
        setMessages(prev => [...prev, {
          sender: 'admin',
          content: newMsg,
          timestamp: new Date()
        }]);
        setNewMsg('');
      } else {
        console.error('Message not sent');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // ⏱ Poll for latest messages every 10 seconds if a user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const interval = setInterval(() => {
      fetchMessages(selectedUser.userId);
    }, 10000);

    return () => clearInterval(interval); // clean up on unmount or change
  }, [selectedUser]);

  useEffect(() => {
    fetchUsersWithMessages();
  }, []);

  return (
    <Row>
  <Col md={4} sm={12} className="mb-3">
    <h5 className="fw-bold">Users</h5>
    <ListGroup>
      {users.map((u, index) => (
        u && u.userId && (
          <ListGroup.Item
            key={u.userId || index}
            onClick={() => handleUserClick(u)}
            action
            className="d-flex justify-content-between align-items-center"
          >
            <span>{u.name || 'Unnamed'}</span>
            <small className="text-muted">({u.role || 'Unknown Role'})</small>
          </ListGroup.Item>
        )
      ))}
    </ListGroup>
  </Col>

  <Col md={8} sm={12}>
    <Card className="p-3 shadow-sm">
      {selectedUser ? (
        <>
          <h5 className="fw-bold mb-3">Chat with {selectedUser.name || 'User'}</h5>
          <div
            className="chat-box mb-3 p-2 border rounded bg-light"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-3 p-2 rounded w-75 ${
                  m.sender === 'admin'
                    ? 'ms-auto admin-message message-bubble  text-dark'
                    : 'me-auto user-message message-bubble  text-white'
                }`}
              >
                <div className="fw-semibold mb-1">{m.sender === 'admin' ? 'Admin' : 'User'}</div>
                <div>{m.content}</div>
                <small className="text-muted d-block text-end mt-1">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
          <Form.Group className="d-flex">
            <Form.Control
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type message..."
              className="me-2"
            />
            <Button onClick={sendMessage}>Send</Button>
          </Form.Group>
        </>
      ) : (
        <p className="text-muted">Select a user to view messages.</p>
      )}
    </Card>
  </Col>
</Row>

  );
};

export default MessagesTab;
