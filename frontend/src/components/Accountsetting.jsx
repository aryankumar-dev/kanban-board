import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';

const Accountsetting = () => {


    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getCurrentUser`, {
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


    return (
        <div>
            <Nav />
            <div className="home-layout">
                <Sidebar />
                <div className="home-content">
                    <h1>Account Setting</h1>
                    <div>
                        <p>Name : {user?.fullName || 'Loading...'} </p>
                         <p>Email : {user?.email || 'Loading...'} </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Accountsetting;
