import React from 'react';
import type { CreditCard } from '../types';

interface CreditCardItemProps {
  card: CreditCard;
  isSelected: boolean;
  isCompareDisabled: boolean;
  onToggleCompare: (card: CreditCard) => void;
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
    {children}
  </span>
);

export const CreditCardItem: React.FC<CreditCardItemProps> = ({ card, isSelected, isCompareDisabled, onToggleCompare }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{card.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{card.bank}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {card.bestFor.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
      <div className="px-5 pb-5 mt-auto">
        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 mb-5">
          <li><strong>Joining Fee:</strong> ₹{card.joiningFee.toLocaleString('en-IN')}</li>
          <li><strong>Annual Fee:</strong> ₹{card.annualFee.toLocaleString('en-IN')}</li>
          <li><strong>Fee Waiver:</strong> {card.feeWaiver}</li>
          <li><strong>Bonus:</strong> {card.welcomeBonus}</li>
        </ul>
        <div className="flex items-center gap-2">
           <button
            onClick={() => onToggleCompare(card)}
            disabled={isCompareDisabled}
            className={`block w-full font-bold py-2 px-4 rounded-lg transition-colors text-sm ${
              isSelected
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900'
                : isCompareDisabled 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            title={isCompareDisabled ? "You can compare up to 4 cards at a time." : ""}
          >
            {isSelected ? '✓ Selected' : '+ Compare'}
          </button>
          <a
            href={card.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};