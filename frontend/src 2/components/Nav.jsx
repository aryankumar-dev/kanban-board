import React, { useEffect, useState } from 'react';
import './Nav.css';
function Nav() {

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

        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <a className="navbar-brand ms-5" href="#">Select Project </a>
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
                    <li className="nav-item active">
                        <a className="nav-link" href="#">
                            Dropdown <span className="visually-hidden">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Logo</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">{user.username}</a>
                    </li>
                </ul>

            </div>
        </nav>


    );

}

export default Nav;

