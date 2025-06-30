import React, { useEffect, useState } from 'react';
import './Notes.css';
import Addnote from './Addnote';
import { useParams } from 'react-router-dom';

const Notes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const { projectId } = useParams();

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, [projectId]);

const fetchNotes = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/note/getNotes/${projectId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Fetched Notes Response:', data);

    const notesArray = data?.data?.notes;

    if (Array.isArray(notesArray)) {
      setNotes(notesArray);
    } else {
      setError(data?.data?.message || 'Failed to fetch notes.');
    }
  } catch (err) {
    setError('An error occurred while fetching notes.');
    console.error(err);
  }
};



  const handleDelete = async (noteId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/note/deleteNote/${noteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        
        setNotes(prev => prev.filter(note => note._id !== noteId));
      } else {
        alert(data.message || 'Failed to delete.');
      }
    } catch (err) {
      alert('An error occurred.');
      console.error(err);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchNotes();
  };

  return (
    <div className='Note-container border'>
      <button onClick={() => setIsModalOpen(true)}>Create New Note</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Addnote
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        projectId={projectId}
      />

      <div className='grid-container'>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map(note => (
            <div className='Notebox border' key={note._id}>
              <p>{note.content}</p>
              <div className='note-actions'>
                {/* Implement handleEdit() if needed */}
                <button onClick={() => alert('Edit functionality coming soon')}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
