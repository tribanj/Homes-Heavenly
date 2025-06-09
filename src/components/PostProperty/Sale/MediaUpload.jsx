import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const MediaUpload = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [images, setImages] = useState(formData.images || []);
  const [video, setVideo] = useState(formData.video || null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validImages = selectedFiles.filter((file) => file.size <= 5 * 1024 * 1024); // Max 5MB
    if (validImages.length + images.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }
    if (validImages.length !== selectedFiles.length) {
      setError('Some of the images are too large. Please upload images under 5MB.');
      return;
    }
    setImages((prev) => [...prev, ...validImages]);
    setError('');
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 20 * 1024 * 1024) {
      setError('Video file size must be less than 20MB.');
      return;
    }
    setVideo(file);
    setError('');
  };

  const handleNext = (e) => {
    e.preventDefault();
    updateFormData({ images, video });
    nextStep();
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Form onSubmit={handleNext} className="p-3">
      <h4 className="mb-4">Step 2: Media Upload</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="images" className="mb-3">
        <Form.Label>Upload Property Images (Max 5, Max 5MB each)</Form.Label>
        <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} />
        <Row className="mt-3">
          {images.map((img, index) => (
            <Col xs={6} md={3} key={index} className="position-relative mb-3">
              <img
                src={URL.createObjectURL(img)}
                alt={`Property ${index}`}
                className="img-fluid rounded border"
              />
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0"
                onClick={() => removeImage(index)}
              >
                ✕
              </Button>
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="video" className="mb-4">
        <Form.Label>Upload Walkthrough Video (Optional, Max 20MB)</Form.Label>
        <Form.Control type="file" accept="video/*" onChange={handleVideoChange} />
        {video && (
          <div className="mt-3">
            <strong>Selected Video:</strong> {video.name}
          </div>
        )}
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep}>
          &laquo; Back
        </Button>
        <Button variant="primary" type="submit">
          Next &raquo;
        </Button>
      </div>
    </Form>
  );
};

export default MediaUpload;
