import React from "react";
import { FiBarChart2 } from "react-icons/fi";

const ReportsAndAnalytics = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiBarChart2 className="me-3" /> Reports & Analytics
        </h2>
        <button className="py-2 px-4 bg-blue-600 text-white rounded-lg">
          Export Reports (PDF/Excel)
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          This section will provide detailed, data-driven reports for
          performance reviews. You will be able to generate:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
          <li>
            <strong>Agent-wise Reports:</strong> Track properties handled, leads
            assigned vs. closed, and total commissions earned per agent.
          </li>
          <li>
            <strong>Team-wide Reports:</strong> Analyze overall revenue
            generated, total deals closed (monthly/quarterly), and the team's
            lead conversion ratio.
          </li>
          <li>
            <strong>Project-based Reports:</strong> Monitor the financial
            performance of projects assigned to your team, comparing expenses
            vs. sales.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
