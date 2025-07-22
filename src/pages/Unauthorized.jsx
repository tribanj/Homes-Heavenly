import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8 max-w-lg">
        {/* Warning Icon with Shake Animation */}
        <div className="animate-shake">
          <svg
            className="w-24 h-24 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Animated Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-500 animate-pulse tracking-tight">
          🚫 ACCESS DENIED
        </h1>

        {/* Message */}
        <p className="text-lg sm:text-xl text-gray-300 font-medium">
          You lack the necessary permissions to view this page. Return to safety or face the consequences!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-block bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          Return to Home
        </button>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          animation-iteration-count: 2;
        }
      `}</style>
    </div>
  );
};

export default Unauthorized;
