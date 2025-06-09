import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const DefineUnits = () => {
  const [units, setUnits] = useState([]);

  const [newUnit, setNewUnit] = useState({
    type: '',
    size: '',
    price: '',
    availability: '',
  });

  const handleChange = (e) => {
    setNewUnit({
      ...newUnit,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUnit = () => {
    if (newUnit.type && newUnit.size && newUnit.price && newUnit.availability) {
      setUnits([...units, newUnit]);
      setNewUnit({ type: '', size: '', price: '', availability: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('✅ Units Defined:', units);
    // TODO: Save units to backend
  };

  return (
    <Card className="p-4 shadow-sm border-0">
      <h4 className="mb-4">🏗️ Define Units - Step 3</h4>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control
              type="text"
              name="type"
              placeholder="Unit Type (Flat/Villa/Office)"
              value={newUnit.type}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              name="size"
              placeholder="Size (e.g., 1200 sqft)"
              value={newUnit.size}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price (in ₹)"
              value={newUnit.price}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              name="availability"
              placeholder="Units Available"
              value={newUnit.availability}
              onChange={handleChange}
            />
          </Col>
          <Col md={1}>
            <Button variant="success" onClick={handleAddUnit}>➕</Button>
          </Col>
        </Row>

        {units.length > 0 && (
          <div className="mb-4">
            <h6>📋 Added Units:</h6>
            <ul>
              {units.map((unit, index) => (
                <li key={index}>
                  {unit.type} – {unit.size} – ₹{unit.price} – {unit.availability} units
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" variant="primary">Next: Inventory Management</Button>
      </Form>
    </Card>
  );
};

export default DefineUnits;
