import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  // Optional: Trigger confetti animation on mount
  useEffect(() => {
    // You can add a library like react-confetti here for more complex confetti effects
    // For now, CSS-based confetti is used
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8 max-w-lg">
        {/* Animated Checkmark Icon */}
        <div className="animate-checkmark">
          <svg
            className="w-24 h-24 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title with Gradient */}
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-indigo-500 text-transparent bg-clip-text animate-pulse">
          Success!
        </h1>

        {/* Message */}
        <p className="text-lg sm:text-xl text-gray-300 font-medium">
          Your submission was successful! Your listing is now under review and will be live soon.
        </p>

        {/* Navigation Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          Back to Home
        </button>

        {/* CSS Confetti Effect */}
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#ff4500', '#00ff00', '#1e90ff', '#ff69b4'][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </div>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes checkmark {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-checkmark {
            animation: checkmark 0.5s ease-out forwards;
          }
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }
          .confetti {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            animation: confetti 3s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};
export default Success