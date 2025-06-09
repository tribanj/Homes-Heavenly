// src/components/AccountMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AccountMenu.css'; // we’ll style it separately

const AccountMenu = ({ onLogout }) => {
  return (
    <div className="account-menu">
      <ul>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        <li><Link to="/user-dashboard">My Dashboard</Link></li>
        <li><Link to="/messages">Messages / Inbox</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/support">Support / Contact Us</Link></li>
        <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
      </ul>
    </div>
  );
};

export default AccountMenu;
