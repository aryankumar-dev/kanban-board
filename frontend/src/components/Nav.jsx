import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        window.location.href = '/login';
      } else {
        setError('Logout failed.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while logging out.');
    }
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getCurrentUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Required for cookies/session-based auth
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API response:', data); // Optional: see what you got
        if (data && data.userdata) {
          setUser(data.userdata);
        } else {
          setError('Unable to fetch user data.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while fetching user data.');
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <a className="navbar-brand ms-5" href="#">
        Select Project
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
          <li className="nav-item">
            <button className="nav-link btn btn-link text-danger fw-bolder" onClick={handleLogout}>
              Logout
            </button>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              📁
            </a>
          </li>
          <li className="nav-item">
            {/* Safely show username or fallback text */}
            <a className="nav-link text-secondary fw-bolder" href="#">
              {user?.fullName || 'Loading...'}
            </a>
          </li>
        </ul>
       
      </div>
    </nav>
  );
}

export default Nav;