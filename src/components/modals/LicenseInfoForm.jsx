// src/components/RoleSelectionModal.jsx
import React from 'react';
import './RoleSelectionModal.css'; // Optional styling (we'll add later)

const roles = ['Normal User', 'Agent', 'Builder', 'Real Estate Company'];

const RoleSelectionModal = ({ onSelectRole, onClose }) => {
  return (
    <div className="role-modal-overlay">
      <div className="role-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Select Your Role</h3>
        <p>Please select your profile type to continue.</p>

        <div className="role-options">
          {roles.map((role) => (
            <button
              key={role}
              className="role-btn"
              onClick={() => onSelectRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
