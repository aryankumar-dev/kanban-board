import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import MoreInfo from './MoreInfo';
import Notes from './Notes';
import Nav from './Nav';
import Sidebar from './Sidebar';


const Singleproject = () => {
  const [activeTab, setActiveTab] = useState('kanban');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'kanban':
        return <KanbanBoard />;
      case 'info':
        return <MoreInfo />;
      case 'notes':
        return <Notes />;
      default:
        return null;
    }
  };


  return (
  <div>
      <Nav />
      <div className="home-layout">
        <Sidebar />
        <div className="home-content">
          <h1>Welcome to the Kanban Board</h1>
            <div className="container mt-4">

          <div className="btn-group mb-3" role="group">
            <button
              className={`btn btn-outline-primary ${activeTab === 'kanban' ? 'active' : ''}`}
              onClick={() => setActiveTab('kanban')}
            >
              Kanban Board
            </button>
            <button
              className={`btn btn-outline-primary ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              More Info
            </button>
            <button
              className={`btn btn-outline-primary ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>

          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
        </div>
      </div>
    </div>

 
  );
};

export default Singleproject;
