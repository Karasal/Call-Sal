
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSalResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are Sal, a friendly AI automation expert. 
        
        RULES:
        1. Use very simple, everyday language. NO tech jargon.
        2. Format your responses with clear paragraphs and line breaks so they are easy to read.
        3. If you suggest multiple things, use simple bullet points.
        4. Tone: "Hi - It's your new pal, Sal!" Enthusiastic, helpful, neighborly.
        
        Focus on:
        - Saving time (Automation).
        - Fixing office headaches (Custom Apps).
        - Making marketing easy (Content Creation).
        - Finding new customers (Sales Automation).`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Hey! I had a little hiccup. Can you try asking me that again? I'm excited to help!";
  }
};
