import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://kanban-board-0e5k.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Check your email for verification and then login');
        setError('');
        setEmailCheck(true);
        setFormData({
          email: '',
          fullName: '',
          username: '',
          password: '',
        });
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
