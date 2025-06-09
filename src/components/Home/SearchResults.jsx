// src/pages/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const keyword = params.get('keyword');
  const type = params.get('type');
  const location = params.get('location');

  return (
    <div className="container mt-4">
      <h2>Search Results</h2>
      <p>Keyword: {keyword}</p>
      <p>Type: {type}</p>
      <p>Location: {location}</p>
      {/* 🔜 Replace with actual search results */}
    </div>
  );
};

export default SearchResults;
