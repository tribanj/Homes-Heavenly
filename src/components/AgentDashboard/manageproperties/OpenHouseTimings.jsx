import React, { useState } from 'react';

const OpenHouseTimings = () => {
  const [openHouseDate, setOpenHouseDate] = useState('');
  const [openHouseTime, setOpenHouseTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!openHouseDate || !openHouseTime) {
      alert('Please select both date and time.');
      return;
    }
    alert(`Open House Scheduled for ${openHouseDate} at ${openHouseTime}.`);
    // Later: Send data to backend server
  };

  return (
    <div className="open-house-timings" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <h2>Set Open House / Property Visit Timings</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Select Date:</label>
          <input
            type="date"
            className="form-control"
            value={openHouseDate}
            onChange={(e) => setOpenHouseDate(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Select Time:</label>
          <input
            type="time"
            className="form-control"
            value={openHouseTime}
            onChange={(e) => setOpenHouseTime(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Additional Note (optional):</label>
          <textarea
            className="form-control"
            placeholder="Any special instructions?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">Set Open House</button>
      </form>
    </div>
  );
};

export default OpenHouseTimings;
