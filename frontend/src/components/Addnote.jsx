import React, { useEffect, useState } from 'react';
import './Notes.css';
import { connect } from 'mongoose';


function Addnote({ isOpen, onClose, onSuccess,projectId }) {
  const [content, setcontent] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    if (!isOpen) return null;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/v1/note/createNote/${projectId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
           
            if (response.ok) {

                onSuccess();
                onClose();
            } else {
                setError(data.message || 'Failed to create project.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred.');
        }

        setLoading(false);

    }



    return (
        <div className='modal-overlay'>
            <div className='model-box'>
                <h2>Create New Notes</h2>
                {error && <p className='modal-error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Note Content</label>
                    <input
                        type="text"
                        placeholder='Enter Note Content'
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                        required
                    />

                    <div className="modal-actions">
                        <button type="submit" className="btn primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                        <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>

    );
}

export default Addnote;


