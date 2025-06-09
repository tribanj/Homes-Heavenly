import React, { useState } from 'react';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';

const InventoryManagement = () => {
  const [units, setUnits] = useState([
    // Dummy data - can be fetched from backend
    {
      id: 1,
      type: 'Flat',
      size: '1200 sqft',
      price: 4500000,
      availability: 5,
      status: 'available',
    },
    {
      id: 2,
      type: 'Villa',
      size: '2400 sqft',
      price: 9500000,
      availability: 2,
      status: 'available',
    }
  ]);

  const [showEdit, setShowEdit] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(null);

  const handleMarkAsSold = (id) => {
    const updatedUnits = units.map(unit =>
      unit.id === id ? { ...unit, status: 'sold' } : unit
    );
    setUnits(updatedUnits);
  };

  const handleEditClick = (unit) => {
    setCurrentUnit(unit);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    setUnits(units.map(unit =>
      unit.id === currentUnit.id ? currentUnit : unit
    ));
    setShowEdit(false);
  };

  return (
    <>
      <h4 className="mb-4">📦 Inventory Management</h4>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Size</th>
            <th>Price (₹)</th>
            <th>Available Units</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, idx) => (
            <tr key={unit.id}>
              <td>{idx + 1}</td>
              <td>{unit.type}</td>
              <td>{unit.size}</td>
              <td>{unit.price}</td>
              <td>{unit.availability}</td>
              <td>
                <Badge bg={unit.status === 'sold' ? 'danger' : 'success'}>
                  {unit.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleEditClick(unit)}
                  className="me-2"
                >
                  ✏️ Edit
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleMarkAsSold(unit.id)}
                  disabled={unit.status === 'sold'}
                >
                  🛑 Mark Sold
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Unit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUnit && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  value={currentUnit.type}
                  onChange={(e) => setCurrentUnit({ ...currentUnit, type: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  value={currentUnit.size}
                  onChange={(e) => setCurrentUnit({ ...currentUnit, size: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentUnit.price}
                  onChange={(e) => setCurrentUnit({ ...currentUnit, price: Number(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="number"
                  value={currentUnit.availability}
                  onChange={(e) => setCurrentUnit({ ...currentUnit, availability: Number(e.target.value) })}
                />
              </Form.Group>
              <Button variant="success" onClick={handleEditSave}>
                💾 Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InventoryManagement;
