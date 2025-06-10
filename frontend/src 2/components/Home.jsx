import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/auth/getCurrentUser', {
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

    <div>
      <Nav />
      <div className="home-layout">
        <Sidebar />
        <div className="home-content">
          <div>

            <h1>Welcome to the Kanban Board</h1>
          

            {user ? (
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {/* You don’t have a `name` field, fallback to username */}</p>
                <p><strong>Username:</strong> {user.username}</p>
              </div>
            ) : (
              <p>{error || 'Loading user data...'}</p>
            )}
          </div>
        </div>
      </div>
    </div>


  );
}

export default Home;


