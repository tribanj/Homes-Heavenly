import React, { useState } from 'react';

const UploadMedia = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload!');
      return;
    }
    alert(`${selectedFiles.length} file(s) selected for upload.`);
    // Later: Send files to backend server
  };

  return (
    <div className="upload-media" style={{ maxWidth: '700px', margin: '0 auto', padding: '30px' }}>
      <h2>Upload Property Media</h2>

      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label>Select Images, 360 Tours, or Videos:</label>
        <input 
          type="file" 
          className="form-control" 
          multiple 
          accept="image/*, video/*" 
          onChange={handleFileChange} 
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="preview" style={{ marginTop: '20px' }}>
          <h4>Preview Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleUpload} className="btn btn-primary" style={{ marginTop: '20px' }}>
        Upload Selected Files
      </button>
    </div>
  );
};

export default UploadMedia;
