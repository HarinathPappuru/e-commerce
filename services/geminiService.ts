
import { GoogleGenAI } from "@google/genai";
import { StylingMessage } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getStylingAdvice = async (chatHistory: StylingMessage[], userPrompt: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please configure your environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = 'gemini-3-flash-preview';

    const systemInstruction = `
      You are a world-class luxury fashion stylist for 'VOGUE AI'.
      Your tone is sophisticated, helpful, and trendy.
      You give personalized fashion advice based on current trends and the user's wardrobe questions.
      Keep your responses concise but professional.
      When suggesting items, focus on classic silhouettes and modern color palettes.
    `;

    // Map history to the format expected by the API
    const contents = chatHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }]
    });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a styling tip right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The fashion studio is currently busy. Please try asking for advice again in a moment.";
  }
};
