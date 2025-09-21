import React from 'react';
import type { CreditCard } from '../types';

interface ComparisonTrayProps {
  selectedCards: CreditCard[];
  onCompare: () => void;
  onClear: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({ selectedCards, onCompare, onClear }) => {
  const isVisible = selectedCards.length > 0;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 dark:bg-gray-900 text-white rounded-t-lg shadow-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-bold hidden sm:inline flex-shrink-0">Comparing:</span>
            <div className="flex items-center gap-2">
              {selectedCards.map(card => (
                <span
                  key={card.id}
                  className="text-xs bg-gray-600 dark:bg-gray-700 text-gray-100 px-2 py-1 rounded-md flex-shrink-0 whitespace-nowrap"
                  title={card.name}
                >
                 {card.name.length > 20 ? `${card.name.substring(0, 18)}...` : card.name}
                </span>
              ))}
               {selectedCards.length >= 4 && (
                <span className="text-xs text-yellow-400 hidden lg:inline whitespace-nowrap">Limit of 4 cards reached.</span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={onCompare}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Compare ({selectedCards.length})
            </button>
            <button
              onClick={onClear}
              aria-label="Clear selection"
              className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold p-2 rounded-lg transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};