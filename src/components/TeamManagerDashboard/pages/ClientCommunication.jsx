import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const ClientCommunication = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FiMessageSquare className="me-3" /> Client Communication Hub
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          This page will provide a centralized hub for client communication. Key
          features will include:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
          <li>
            A shared view of chat, call, and email logs between your agents and
            clients.
          </li>
          <li>
            The ability to monitor or join conversations to provide support when
            needed.
          </li>
          <li>
            A system to approve special client requests, like discounts or
            custom terms, before they are sent.
          </li>
          <li>
            Notifications for client messages that have not been responded to
            within the defined SLA.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientCommunication;
