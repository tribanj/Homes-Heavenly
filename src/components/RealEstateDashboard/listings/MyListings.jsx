import React, { useState } from 'react';
import { Table, Badge, Dropdown, Card } from 'react-bootstrap';

const mockListings = [
  {
    id: 1,
    title: '3BHK Flat in Mumbai',
    category: 'Buy',
    status: 'Active',
    price: '1.2 Cr',
    location: 'Andheri West',
    listedOn: '2025-04-10',
  },
  {
    id: 2,
    title: 'Office Space in Pune',
    category: 'Commercial Rent',
    status: 'Archived',
    price: '₹45,000/mo',
    location: 'Baner',
    listedOn: '2025-03-15',
  },
];

const MyListings = () => {
  const [listings] = useState(mockListings);

  const handleAction = (id, action) => {
    console.log(`Action "${action}" on listing ID: ${id}`);
    // You can update state or call API here
  };

  return (
    <div>
      <h4 className="mb-4">📋 My Property Listings</h4>
      <Card className="p-3 shadow-sm">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Listed On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr key={listing.id}>
                <td>{index + 1}</td>
                <td>{listing.title}</td>
                <td>{listing.category}</td>
                <td>{listing.price}</td>
                <td>{listing.location}</td>
                <td>
                  <Badge bg={listing.status === 'Active' ? 'success' : 'secondary'}>
                    {listing.status}
                  </Badge>
                </td>
                <td>{listing.listedOn}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" size="sm">Manage</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction(listing.id, 'view')}>👁️ View</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction(listing.id, 'edit')}>✏️ Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction(listing.id, 'archive')}>🗂️ Archive</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction(listing.id, 'markAsSold')}>✅ Mark as Sold</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction(listing.id, 'relist')}>🔁 Relist</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default MyListings;
