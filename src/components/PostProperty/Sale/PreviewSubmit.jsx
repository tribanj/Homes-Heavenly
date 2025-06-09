import React, { useState } from 'react';
import { Button, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';

const PreviewSubmit = ({ prevStep, formData, handleFinalSubmit }) => {
  const {
    title,
    description,
    category,
    type,
    price,
    location,
    address,
    bedrooms,
    bathrooms,
    area,
    furnishing,
    amenities,
    images,
    videoLink,
  } = formData;

  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const renderList = (label, value) => (
    <ListGroup.Item>
      <strong>{label}:</strong> {value || 'N/A'}
    </ListGroup.Item>
  );

  const handleConfirmation = () => {
    if (window.confirm('Are you sure you want to submit the property ad?')) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Disable submit while in progress
    try {
      // Simulate the API submission logic here
      await handleFinalSubmit(); // Assuming handleFinalSubmit is an async function
      setSubmitStatus('success');
      alert('Property successfully submitted!');
      resetForm(); // Reset form after successful submission
    } catch (error) {
      setSubmitStatus('error');
      alert('There was an error submitting the property.');
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const resetForm = () => {
    // Resetting the form (if required after success)
    // Optional: Reset form fields if required after successful submission
  };

  return (
    <div className="p-3">
      <h4 className="mb-4">Step 6: Review & Submit</h4>

      {submitStatus === 'success' && <Alert variant="success">Property submitted successfully!</Alert>}
      {submitStatus === 'error' && <Alert variant="danger">An error occurred. Please try again.</Alert>}

      <Card className="mb-3">
        <Card.Header>Basic Details</Card.Header>
        <ListGroup variant="flush">
          {renderList('Title', title)}
          {renderList('Description', description)}
          {renderList('Category', category)}
          {renderList('Type', type)}
          {renderList('Price', price)}
        </ListGroup>
      </Card>

      <Card className="mb-3">
        <Card.Header>Location & Property Details</Card.Header>
        <ListGroup variant="flush">
          {renderList('Location', location)}
          {renderList('Address', address)}
          {renderList('Bedrooms', bedrooms)}
          {renderList('Bathrooms', bathrooms)}
          {renderList('Area (sq ft)', area)}
          {renderList('Furnishing', furnishing)}
          {renderList('Amenities', amenities?.join(', ') || 'None')}
        </ListGroup>
      </Card>

      <Card className="mb-3">
        <Card.Header>Media</Card.Header>
        <ListGroup variant="flush">
          {images?.length ? (
            <ListGroup.Item>
              <strong>Images:</strong>
              <div className="d-flex mt-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Uploaded file ${index + 1}`} // Avoid redundant "image" in alt text
                    style={{ width: '60px', height: '60px', marginRight: '10px' }}
                    className="img-thumbnail"
                  />
                ))}
              </div>
            </ListGroup.Item>
          ) : (
            renderList('Images Uploaded', 'None')
          )}
          {videoLink ? renderList('Video Link', videoLink) : renderList('Video', 'None')}
        </ListGroup>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep}>
          &laquo; Back
        </Button>
        <Button
          variant="success"
          onClick={handleConfirmation}
          disabled={isSubmitting} // Disable while submitting
        >
          {isSubmitting ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="visually-hidden">Submitting...</span>
              Submitting...
            </>
          ) : (
            'Submit Property Ad'
          )}
        </Button>
      </div>
    </div>
  );
};

export default PreviewSubmit;
