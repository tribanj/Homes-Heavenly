import React, { useState } from 'react';

const SetOpenHouse = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Open House Scheduled!\nDate: ${date}\nTime: ${startTime} - ${endTime}`);
    // Later: Save this data to backend
  };

  return (
    <div className="set-open-house" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <h2>Set Open House Timings</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Select Date:</label>
          <input 
            type="date" 
            className="form-control" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Start Time:</label>
          <input 
            type="time" 
            className="form-control" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>End Time:</label>
          <input 
            type="time" 
            className="form-control" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Open House</button>
      </form>
    </div>
  );
};

export default SetOpenHouse;
