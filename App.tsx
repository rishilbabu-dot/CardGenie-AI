
import React, { useState, useMemo, useRef, createContext, useContext, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CardDirectory } from './components/CardDirectory';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ComparisonView } from './components/ComparisonView';
import { ComparisonTray } from './components/ComparisonTray';
import type { CreditCard, UserProfile, RecommendedCard } from './types';
import { ALL_CARDS } from './data/creditCards';
import { getCardRecommendations } from './services/geminiService';

// --- Theme Context and Provider ---
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to apply class to <html> and update localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedCards, setRecommendedCards] = useState<RecommendedCard[]>([]);
  const [comparisonList, setComparisonList] = useState<CreditCard[]>([]);

  const comparisonRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  
  const { theme, toggleTheme } = useTheme();

  const handleStartComparison = () => {
    setRecommendedCards([]);
    setError(null);
    setIsModalOpen(true);
  };

  const handleFindCards = async (profile: UserProfile) => {
    setIsModalOpen(false);
    setIsLoading(true);
    setError(null);
    setRecommendedCards([]);
    
    // Scroll to the comparison section
    setTimeout(() => {
        comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const recommendations = await getCardRecommendations(profile, ALL_CARDS);
      setRecommendedCards(recommendations);
    } catch (err)      {
      console.error("Error getting recommendations:", err);
      setError("Sorry, the AI assistant is currently unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompare = (cardToToggle: CreditCard) => {
    setComparisonList(prevList => {
      const isInList = prevList.some(card => card.id === cardToToggle.id);
      if (isInList) {
        return prevList.filter(card => card.id !== cardToToggle.id);
      } else {
        if (prevList.length < 4) { // Limit to 4 cards for comparison
          return [...prevList, cardToToggle];
        }
        return prevList; // Do not add more than 4 cards
      }
    });
  };

  const handleClearComparison = () => {
    setComparisonList([]);
  };

  const scrollToComparison = () => {
    comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fullRecommendedCardDetails = useMemo(() => {
    return recommendedCards
      .map(rec => {
        const cardDetails = ALL_CARDS.find(card => card.id === rec.cardId);
        if (cardDetails) {
          return { ...cardDetails, score: rec.score, reasoning: rec.reasoning };
        }
        return null;
      })
      .filter((card): card is CreditCard & { score: number; reasoning: string } => card !== null);
  }, [recommendedCards]);
  
  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero onStart={handleStartComparison} onExplore={scrollToDirectory} />
        
        <div ref={comparisonRef}>
          <ComparisonView 
            aiCards={fullRecommendedCardDetails}
            isLoading={isLoading}
            error={error}
            manualCards={comparisonList}
            onClearManual={handleClearComparison}
            theme={theme}
          />
        </div>

        <div ref={directoryRef}>
          <CardDirectory 
            cards={ALL_CARDS} 
            comparisonList={comparisonList}
            onToggleCompare={handleToggleCompare}
          />
        </div>
      </main>
      
      <AIAssistantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFindCards}
      />

      <ComparisonTray
        selectedCards={comparisonList}
        onCompare={scrollToComparison}
        onClear={handleClearComparison}
      />

      <footer className="bg-gray-800 dark:bg-black text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} CardGenie. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Created by Rishil and made with ❤️ in India </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}