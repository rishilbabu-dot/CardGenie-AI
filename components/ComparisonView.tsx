import React from 'react';
import type { CreditCard } from '../types';


interface RecommendedCardWithDetails extends CreditCard {
  score: number;
  reasoning: string;
}

interface ComparisonViewProps {
  aiCards: RecommendedCardWithDetails[];
  isLoading: boolean;
  error: string | null;
  manualCards: CreditCard[];
  onClearManual: () => void;
  theme: 'light' | 'dark';
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
    <div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mb-6"></div>
      <div className="h-10 bg-blue-100 dark:bg-blue-900 rounded-full w-24 mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
    <div className="mt-8">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.986c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

const getGridColsClass = (count: number) => {
    switch (count) {
        case 1: return 'lg:grid-cols-1';
        case 2: return 'lg:grid-cols-2';
        case 3: return 'lg:grid-cols-3';
        case 4: return 'lg:grid-cols-4';
        default: return 'lg:grid-cols-4';
    }
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ aiCards, isLoading, error, manualCards, onClearManual, theme }) => {
  const hasAiContent = isLoading || (aiCards && aiCards.length > 0) || error;
  const hasManualContent = manualCards && manualCards.length > 0;

  if (!hasAiContent && !hasManualContent) {
    return null;
  }

  const comparisonFields = [
    { label: 'Joining Fee', key: 'joiningFee', format: (val: number) => `₹${val.toLocaleString('en-IN')}` },
    { label: 'Annual Fee', key: 'annualFee', format: (val: number) => `₹${val.toLocaleString('en-IN')}` },
    { label: 'Fee Waiver', key: 'feeWaiver' },
    { label: 'Interest Rate', key: 'interestRate' },
    { label: 'Welcome Bonus', key: 'welcomeBonus' },
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      {hasAiContent && (
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Your AI-Powered Recommendations</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Here are the top 3 cards we think you'll love.</p>
          </div>
          
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          )}

          {error && (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {!isLoading && !error && aiCards.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {aiCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 flex flex-col transition-all duration-300 transform hover:-translate-y-2 ${
                    index === 0 ? 'border-amber-400' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* Scrollable content area */}
                  <div className="p-6 flex-1 min-h-0 overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{card.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{card.bank}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-3xl font-bold text-blue-600">{card.score}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">MATCH<br/>SCORE</p>
                      </div>
                    </div>
                     {index === 0 && (
                      <div className="text-left mb-4">
                        <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-sm font-bold px-4 py-1 rounded-full inline-flex items-center gap-1">
                          <StarIcon className="w-4 h-4" /> Top Match
                        </span>
                      </div>
                    )}
                    
                    <div className="my-6">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">AI Reasoning:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 p-3 rounded-lg">{card.reasoning}</p>
                    </div>
                    
                    <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex justify-between items-center"><span className="font-semibold text-gray-800 dark:text-gray-100">Joining Fee:</span> <span>₹{card.joiningFee.toLocaleString('en-IN')}</span></li>
                        <li className="flex justify-between items-center"><span className="font-semibold text-gray-800 dark:text-gray-100">Annual Fee:</span> <span>₹{card.annualFee.toLocaleString('en-IN')}</span></li>
                        <li className="pt-2"><span className="font-semibold text-gray-800 dark:text-gray-100 block mb-1">Fee Waiver:</span> <span className="text-xs">{card.feeWaiver}</span></li>
                        <li className="pt-2"><span className="font-semibold text-gray-800 dark:text-gray-100 block mb-1">Bonus:</span> <span className="text-xs">{card.welcomeBonus}</span></li>
                    </ul>
                  </div>
                  
                  {/* Action button at the bottom */}
                  <div className="p-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href={card.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {hasManualContent && (
        <div className="container mx-auto px-6 mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Compare Your Selection</h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Side-by-side details of the cards you've chosen.</p>
            </div>
            <button
              onClick={onClearManual}
              className="mt-4 sm:mt-0 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
            >
              Clear Selection
            </button>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${getGridColsClass(manualCards.length)} gap-6`}>
            {manualCards.map(card => (
              <div key={card.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{card.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{card.bank}</p>
                <div className="space-y-4 my-4 text-sm sm:text-base">
                  {comparisonFields.map(field => (
                    <div key={field.key}>
                      <p className="font-semibold text-gray-500 dark:text-gray-400">{field.label}</p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {field.format ? field.format(card[field.key as keyof CreditCard] as number) : card[field.key as keyof CreditCard]}
                      </p>
                    </div>
                  ))}
                  <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">Key Features</p>
                    <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200 space-y-1 mt-1">
                      {card.features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                  </div>
                </div>
                <a
                  href={card.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};