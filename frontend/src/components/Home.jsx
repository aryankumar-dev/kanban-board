import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import MyTable from './MyDataTable';
import Modal from './Modal'; // Import your modal

function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // You can trigger refresh logic here if needed
    alert('Project created!');
  };

  return (
    <div>
      <Nav />
      <div className="home-layout">
        <Sidebar />
        <div className="home-content">
          <h1>Welcome to the Kanban Board</h1>
          <button onClick={() => setIsModalOpen(true)}>Create New Project</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
          <div className="table-container">
            <MyTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
