import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initializing GoogleGenAI with a named parameter and using process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyInspiration = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a powerful, elegant, one-sentence motivational quote about leadership and faith-centered growth. Keep it professional and inspiring.",
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text || "Success is not a destination, but a continuous journey of growth and faith.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The purpose of leadership is to inspire others to find their own light.";
  }
};

export const getArticleSummary = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this blog post into a 2-sentence inspiring takeaway for a leader: "${content}"`,
    });
    return response.text;
  } catch (error) {
    return null;
  }
};