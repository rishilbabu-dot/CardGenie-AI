
import React from 'react';

interface HeroProps {
  onStart: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onExplore }) => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
          Find the Best Credit Card
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            for You using Card Ginie AI assistant 
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our AI-powered assistant analyzes your income levels and preferences to find the perfect credit card that maximizes your benefits.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start AI Comparison
          </button>
           <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 border border-blue-600 dark:border-blue-400 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
          >
            Explore All Cards
          </button>
        </div>
      </div>
    </section>
  );
};