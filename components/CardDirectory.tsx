

import React, { useState, useMemo } from 'react';
import type { CreditCard } from '../types';
import { CreditCardItem } from './CreditCardItem';

interface CardDirectoryProps {
  cards: CreditCard[];
  comparisonList: CreditCard[];
  onToggleCompare: (card: CreditCard) => void;
}

const FILTERS = ['All', 'No Annual Fee', 'Best for Travel', 'Cashback', 'Premium Cards'];

export const CardDirectory: React.FC<CardDirectoryProps> = ({ cards, comparisonList, onToggleCompare }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCards = useMemo(() => {
    return cards
      .filter(card => {
        // Filter logic
        if (activeFilter === 'All') return true;
        if (activeFilter === 'No Annual Fee') return card.annualFee === 0;
        if (activeFilter === 'Best for Travel') return card.bestFor.includes('Travel');
        if (activeFilter === 'Cashback') return card.bestFor.includes('Cashback');
        if (activeFilter === 'Premium Cards') return card.bestFor.includes('Premium');
        return true;
      })
      .filter(card => {
        // Search logic
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          card.name.toLowerCase().includes(lowerSearchTerm) ||
          card.bank.toLowerCase().includes(lowerSearchTerm)
        );
      });
  }, [cards, searchTerm, activeFilter]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Explore All Credit Cards</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Browse our curated directory of the top credit cards in India.
          </p>
        </div>

        {/* Search and Filter UI */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by card name or bank..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
               <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 overflow-x-auto pb-2">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCards.map(card => {
              const isSelected = comparisonList.some(c => c.id === card.id);
              return (
                <CreditCardItem 
                  key={card.id} 
                  card={card}
                  isSelected={isSelected}
                  onToggleCompare={onToggleCompare}
                  isCompareDisabled={!isSelected && comparisonList.length >= 4}
                />
              )
            })}
          </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-300">No cards match your criteria.</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
        )}
      </div>
    </section>
  );
};