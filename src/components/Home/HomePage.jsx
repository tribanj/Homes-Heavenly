import React from "react";
import SearchBar from "../components/Home/SearchBar";

const HomePage = () => {
  const handleSearch = (filters) => {
    console.log("Search initiated with:", filters);
    // Optional: Navigate to a results page or trigger a fetch
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Other home content */}
    </div>
  );
};

export default HomePage;
