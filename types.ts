export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  joiningFee: number;
  annualFee: number;
  feeWaiver: string;
  interestRate: string;
  welcomeBonus: string;
  features: string[];
  bestFor: string[];
  officialUrl: string;
}

export interface UserProfile {
  monthlyIncome: number;
  spendingCategories: string[];
  preferences: string[];
}

export interface RecommendedCard {
  cardId: string;
  score: number;
  reasoning: string;
}

export interface GeminiApiResponse {
  recommendations: RecommendedCard[];
}