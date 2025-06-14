import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
function Sidebar() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/auth/getCurrentUser', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.userdata) {
          setUser(data.userdata);
        } else {
          setError('Unable to fetch user data.');
        }
      })
      .catch(() => {
        setError('An error occurred while fetching user data.');
      });
  }, []);

  const handleSuccess = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="sidebar">
      <a className="active" href="#home">Project</a>

      <a
        onClick={() => navigate(`/accountsetting`)}
      >
        Account Setting
      </a>
      <a onClick={() => setIsModalOpen(true)}>Add Project</a>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

    </div>
  );
}

export default Sidebar;

