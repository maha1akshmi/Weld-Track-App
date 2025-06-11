import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav>
    <div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/weld-gun-details">Weld Gun Details</Link></li>
        <li><Link to="/errors">Errors</Link></li>
        <li><Link to="/admin">Admin</Link></li>
   
      </ul>
    </div>
    </nav>
  );
}
