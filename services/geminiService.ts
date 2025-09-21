import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile, CreditCard, GeminiApiResponse, RecommendedCard } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          cardId: {
            type: Type.STRING,
            description: 'The unique ID of the recommended card.',
          },
          score: {
            type: Type.INTEGER,
            description: 'A score from 1-100 indicating how well the card matches the user profile.',
          },
          reasoning: {
            type: Type.STRING,
            description: 'A concise explanation for why this card is a good fit for the user.',
          },
        },
        required: ['cardId', 'score', 'reasoning'],
      },
    },
  },
  required: ['recommendations'],
};

export async function getCardRecommendations(
  profile: UserProfile,
  cardList: CreditCard[]
): Promise<RecommendedCard[]> {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }
  
  const systemInstruction = `You are "CardGenie", an expert AI assistant specializing in Indian credit cards. Your goal is to help users find the best credit card from a provided list based on their financial profile and preferences. You must respond in JSON format. Analyze the user's profile and the provided list of credit cards. Recommend the top 3 best-suited cards. The cardId in your response must exactly match one of the IDs from the provided card list.`;

  const userProfilePrompt = `
    Here is the user's profile:
    - Monthly Income: ${profile.monthlyIncome} INR
    - Top Spending Categories: ${profile.spendingCategories.join(', ') || 'Not specified'}
    - Desired Benefits: ${profile.preferences.join(', ') || 'Not specified'}

    Here is the list of available credit cards:
    ${JSON.stringify(cardList, null, 2)}

    Please provide the top 3 recommendations in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userProfilePrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 }, // Optimize for low latency
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse: GeminiApiResponse = JSON.parse(jsonText);
    
    if (parsedResponse && Array.isArray(parsedResponse.recommendations)) {
       return parsedResponse.recommendations.slice(0, 3);
    } else {
        throw new Error("Invalid response structure from AI.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get recommendations from AI.");
  }
}