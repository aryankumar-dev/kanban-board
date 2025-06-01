import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <a className="active" href="#home">Project</a>
      <a href="#news">Account Setting</a>
      <a href="#contact">Add Project</a>
     
    </div>
  );
}

export default Sidebar;
