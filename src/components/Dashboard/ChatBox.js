import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([
    { text: user?.message || "Hi, I'm interested in the job!", sender: 'user', time: new Date().toLocaleTimeString() }
  ]);
  const [msg, setMsg] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { text: msg, sender: 'user', time: new Date().toLocaleTimeString() }]);
    setMsg('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message-bubble ${m.sender === 'user' ? 'user-message' : 'other-message'}`}>
            <p className="mb-1">{m.text}</p>
            <small className="text-muted">{m.time}</small>
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
