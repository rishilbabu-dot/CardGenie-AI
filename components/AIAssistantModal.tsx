
import React, { useState, useCallback } from 'react';
import type { UserProfile } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: UserProfile) => void;
}

const spendingOptions = ['Shopping', 'Fuel', 'Travel', 'Dining', 'Online', 'Bills'];
const preferenceOptions = ['Cashback', 'Rewards', 'Lounge Access', 'EMI'];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [spendingCategories, setSpendingCategories] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleCheckboxChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseInt(monthlyIncome, 10);
    if (isNaN(income) || income <= 0) {
      alert("Please enter a valid monthly income.");
      return;
    }
    onSubmit({
      monthlyIncome: income,
      spendingCategories,
      preferences,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Tell us about yourself to get personalized recommendations.</p>
                </div>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
            </div>
            
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="income" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What is your monthly income (in INR)?
                </label>
                <input
                  type="number"
                  id="income"
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 75000"
                  required
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Spending Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {spendingOptions.map(option => (
                    <CheckboxPill
                      key={option}
                      id={`spend-${option}`}
                      label={option}
                      checked={spendingCategories.includes(option)}
                      onChange={() => handleCheckboxChange(setSpendingCategories, option)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">What benefits are you looking for?</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {preferenceOptions.map(option => (
                    <CheckboxPill
                      key={option}
                      id={`pref-${option}`}
                      label={option}
                      checked={preferences.includes(option)}
                      onChange={() => handleCheckboxChange(setPreferences, option)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 rounded-b-2xl">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Find My Perfect Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


interface CheckboxPillProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void;
}

const CheckboxPill: React.FC<CheckboxPillProps> = ({ id, label, checked, onChange }) => {
    return (
        <div>
            <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
            <label htmlFor={id} className={`block text-center text-sm font-medium py-2 px-3 rounded-full cursor-pointer transition-colors ${checked ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {label}
            </label>
        </div>
    )
}