import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verifyEmail/${token}`, {
          method: 'GET',
        });

        const data = await res.json();

        if (res.ok) {
          alert('Email verified successfully!');
          navigate('/login');
        } else {
          alert(data.message || 'Verification failed');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
