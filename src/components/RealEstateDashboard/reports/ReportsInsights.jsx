import React from 'react';
import { Card, Row, Col, ProgressBar, Table, Button } from 'react-bootstrap';

const dummyReportData = [
  {
    area: 'Andheri East',
    views: 245,
    inquiries: 67,
    visits: 25,
    deals: 10,
  },
  {
    area: 'Borivali West',
    views: 310,
    inquiries: 90,
    visits: 42,
    deals: 18,
  },
  {
    area: 'Wakad, Pune',
    views: 150,
    inquiries: 45,
    visits: 20,
    deals: 5,
  },
];

const ReportsInsights = () => {
  return (
    <div>
      <h4 className="mb-4">📊 Reports & Insights</h4>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>🔍 Total Property Views</h6>
            <h3>3,120</h3>
            <ProgressBar now={75} label="75%" />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>💬 Total Inquiries</h6>
            <h3>860</h3>
            <ProgressBar variant="info" now={55} label="55%" />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>📅 Visits Scheduled</h6>
            <h3>390</h3>
            <ProgressBar variant="warning" now={40} label="40%" />
          </Card>
        </Col>
      </Row>

      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">📍 Area-Wise Demand Trends</h5>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Area</th>
              <th>Views</th>
              <th>Inquiries</th>
              <th>Visits</th>
              <th>Deals Closed</th>
              <th>Conversion %</th>
            </tr>
          </thead>
          <tbody>
            {dummyReportData.map((item, index) => {
              const conversion = ((item.deals / item.views) * 100).toFixed(1);
              return (
                <tr key={index}>
                  <td>{item.area}</td>
                  <td>{item.views}</td>
                  <td>{item.inquiries}</td>
                  <td>{item.visits}</td>
                  <td>{item.deals}</td>
                  <td>{conversion}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div className="text-end">
          <Button variant="outline-primary">📥 Export Report (PDF)</Button>{' '}
          <Button variant="outline-success">📊 Download Excel</Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportsInsights;
