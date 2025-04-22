import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

const ChatBox = ({ user }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL+`/private/api/messages/${user._id}`);
      const data = await res.json();
      if (res.ok) {
        setMessages(data); // Assuming data is an array of { content, sender, timestamp }
      } else {
        setError(data.message || 'Failed to load messages');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  const handleSend = async () => {
    if (!msg.trim()) return;

    try {
      const res = await fetch(API_URL+'/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, content: msg })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { content: msg, sender: 'user', timestamp: new Date() }]);
        setMsg('');
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {error && <div className="text-danger">{error}</div>}
        {messages.map((m, i) => (
          <div key={i} className={`message-bubble ${m.sender === 'user' ? 'user-message' : 'admin-message'}`}>
            <p className="mb-1">{m.content}</p>
            <small className="text-muted">
              {new Date(m.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input mt-2 d-flex">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Write a message..."
          className="form-control"
        />
        <button onClick={handleSend} className="btn btn-primary ms-2">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
