

import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import MyTable from './MyDataTable';
import './Home.css';
import Modal from './Modal'; // Import your modal

function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);



  useEffect(() => {
    const fetchUser = (retry = false) => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getCurrentUser`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.userdata) {
            setUser(data.userdata);
            setError('');
          } else if (!retry) {
            setTimeout(() => fetchUser(true), 500); // Retry after 500ms
          } else {
            setError('Unable to fetch user data.');
          }
        })
        .catch(() => {
          if (!retry) {
            setTimeout(() => fetchUser(true), 500);
          } else {
            setError('An error occurred while fetching user data.');
          }
        });
    };

    fetchUser();
  }, []);


 
const handleSuccess = () => {
  setRefresh(prev => !prev);  // Toggle the refresh state to trigger useEffect in MyTable
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
         <MyTable refresh={refresh} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
