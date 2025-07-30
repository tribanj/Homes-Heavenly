import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

export default function ProjectManagementPortfolio() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">End-to-End Project Management with Regular Updates</h1>
        <p className="text-lg text-gray-600">
          From layout approvals to interior finishing, we handle every aspect with consistent quality checks and weekly progress updates.
          You'll always be in the loop with photo/video reporting.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Pre-Construction Planning</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Site analysis & feasibility reports</li>
              <li>Permits, legal documentation & zoning clearance</li>
              <li>Budget finalization & timeline planning</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Design & Approval</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>2D and 3D architectural design coordination</li>
              <li>Structural & MEP approvals</li>
              <li>Smart home & sustainability integration</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Procurement & Material Planning</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Vendor selection and price negotiations</li>
              <li>Certified material sourcing</li>
              <li>Procurement scheduling</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">On-Site Construction Oversight</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Daily contractor coordination</li>
              <li>Real-time snag identification</li>
              <li>Foundation, structural work, and roofing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Interior & Finishing</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Wall, flooring, lighting, and paint</li>
              <li>Kitchen & bath installation</li>
              <li>Final inspections</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Regulatory Compliance</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Periodic inspections</li>
              <li>Safety standards compliance</li>
              <li>Occupancy certificate & approvals</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="bg-gray-100 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Weekly Progress Updates with Media</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>WhatsApp/Email updates every 7 days</li>
          <li>High-res photos of completed stages</li>
          <li>Walkthrough milestone videos</li>
          <li>Status dashboard for cost/time tracking</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Choose Our Project Management?</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Transparent budgeting with no hidden charges</li>
          <li>Strict timeline adherence using Gantt charts</li>
          <li>Live issue tracking and change request logging</li>
          <li>Vendor accountability with milestone-linked payouts</li>
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-4 text-center">
        <Button asChild className="w-full">
          <a href="/sample-project-timeline">📎 View Sample Project Timeline</a>
        </Button>
        <Button asChild className="w-full">
          <a href="/project-checklist">🧾 Download Project Checklist</a>
        </Button>
        <Button asChild className="w-full">
          <a href="/completed-projects">🧰 Explore Our Completed Projects</a>
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Request a Free Consultation</h2>
        <form className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Full Name" required />
          <Input placeholder="Email Address" type="email" required />
          <Input placeholder="Phone Number" type="tel" required />
          <Input placeholder="Preferred Consultation Date" type="date" />
          <Textarea placeholder="Project Details or Questions..." className="md:col-span-2" required />
          <Button type="submit" className="md:col-span-2 w-full">Submit Request</Button>
        </form>
      </section>
    </div>
  );
}
