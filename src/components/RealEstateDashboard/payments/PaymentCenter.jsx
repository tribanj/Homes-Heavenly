import React from 'react';
import { Card, Table, Button, Tabs, Tab } from 'react-bootstrap';

const agentCommissions = [
  { id: 1, agent: 'Anil Kumar', amount: '₹25,000', date: '2025-04-20' },
  { id: 2, agent: 'Pooja Rao', amount: '₹18,500', date: '2025-04-21' },
];

const builderPayouts = [
  { id: 1, builder: 'Shree Constructions', amount: '₹3,40,000', date: '2025-04-19' },
];

const clientInvoices = [
  { id: 1, client: 'Raj Malhotra', property: '2BHK Flat in Pune', amount: '₹45,000', date: '2025-04-18' },
];

const PaymentsCenter = () => {
  return (
    <div>
      <h4 className="mb-4">💳 Payments & Invoice Center</h4>

      <Tabs defaultActiveKey="commissions" className="mb-4">
        <Tab eventKey="commissions" title="Agent Commissions">
          <Card className="p-4 shadow-sm">
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agentCommissions.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.agent}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.date}</td>
                    <td><Button size="sm" variant="outline-primary">Export</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Tab>

        <Tab eventKey="payouts" title="Builder Payouts">
          <Card className="p-4 shadow-sm mt-3">
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Builder</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {builderPayouts.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.builder}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.date}</td>
                    <td><Button size="sm" variant="outline-success">Export</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Tab>

        <Tab eventKey="invoices" title="Client Invoices">
          <Card className="p-4 shadow-sm mt-3">
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientInvoices.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.client}</td>
                    <td>{entry.property}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.date}</td>
                    <td><Button size="sm" variant="outline-warning">Download Invoice</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PaymentsCenter;
