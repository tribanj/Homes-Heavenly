import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const UploadMedia = () => {
  const [media, setMedia] = useState({
    images: [],
    brochure: null,
    floorPlan: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === 'images') {
      setMedia((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    } else {
      setMedia((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('✅ Uploaded Media:', media);
    // TODO: Handle actual upload logic here (e.g., to Firebase or backend)
  };

  return (
    <Card className="p-4 shadow-sm border-0">
      <h4 className="mb-4">📤 Upload Project Media - Step 2</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Images (Multiple)</Form.Label>
          <Form.Control
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brochure (PDF)</Form.Label>
          <Form.Control
            type="file"
            name="brochure"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Floor Plan (Image or PDF)</Form.Label>
          <Form.Control
            type="file"
            name="floorPlan"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Next: Define Units</Button>
      </Form>
    </Card>
  );
};

export default UploadMedia;
