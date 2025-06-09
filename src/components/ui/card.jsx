// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white p-4 mb-4 ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`text-gray-800 ${className || ''}`}>{children}</div>;
};
