import React from "react";
import { FiAward, FiVideo, FiUpload } from "react-icons/fi";

const TrainingCertification = () => {
  const sections = [
    {
      icon: <FiVideo className="text-green-500" />,
      title: "Free Webinars & Workshops",
      description:
        "Join our free live webinars to improve your selling skills, learn new marketing strategies, and grow your client base.",
      buttonText: "🎓 View Upcoming Webinars",
      buttonClass: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: <FiAward className="text-blue-500" />,
      title: "Earn Badges & Certifications",
      description:
        "Complete courses and earn badges to showcase your skills and expertise to your clients.",
      buttonText: "🏆 View My Certifications",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <FiUpload className="text-purple-500" />,
      title: "Upload Your Certifications",
      description:
        "Enhance your profile by uploading your professional certifications and licenses.",
      buttonText: "📤 Upload Certification",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Training & Certification
        </h1>
        <p className="text-gray-500 mt-1">
          Enhance your skills and build trust with clients.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-4 mx-auto">{section.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {section.title}
            </h3>
            <p className="text-gray-600 mb-6 flex-grow">
              {section.description}
            </p>
            <button
              className={`w-full mt-auto py-3 px-6 text-white font-bold rounded-lg shadow-md transition-all duration-300 ${section.buttonClass}`}
            >
              {section.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingCertification;
