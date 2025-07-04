import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);
  setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/loginUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        setError('');
        console.log('Login successful:', data);
        navigate('/home');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
    finally {
    setLoading(false);
  }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Example: navigate to forgot password page
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

           <button type="submit" disabled={loading}>
  {loading ? <div className="spinner"></div> : 'Login'}
</button>

        {/* <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p> */}
      </form>
  

    </div>
  );
};

export default Login;
