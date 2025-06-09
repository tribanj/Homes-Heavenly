import React from 'react';

export const Textarea = ({ value, onChange, placeholder, name, className = '', ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      rows={4}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};
