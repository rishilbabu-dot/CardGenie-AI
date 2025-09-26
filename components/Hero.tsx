import React from 'react';

interface HeroProps {
  onStart: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onExplore }) => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Find Your Perfect Credit Card
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Powered by AI
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our AI assistant analyzes your spending and preferences to find the perfect credit card that maximizes your benefits.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20 hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start AI Comparison
          </button>
           <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 border border-blue-600/50 dark:border-blue-400/50 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
          >
            Explore All Cards
          </button>
        </div>
      </div>
    </section>
  );
};