
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Noorulain Farooq's portfolio. 
Noorulain is a Bachelor's student (graduating Fall 2026) specializing in AI and Data.
Her key skills include AI Automation, Data Analysis, Intelligent Workflows (n8n), and Data Annotation.
She previously worked as a Data Annotator at CNTXT.

Projects you can talk about:
1. AI Voice Assistant for Vital Signs: Uses Vapi and n8n to collect patient vitals over phone calls.
2. Scout.ai: AI job search tool that automates finding live job listings from Indeed using n8n and Google AI Studio.
3. Comparative ML Analysis: Comparing Random Forest, XGBoost, and LightGBM performance on classification tasks.
4. AI Notes Taker: Uses Whisper API and n8n to generate structured lecture notes from audio.

Be professional, helpful, and concise. Your goal is to represent Noorulain and help recruiters or clients understand her work.
`;

export const sendMessage = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const response = await chat;
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again or reach out to Noorulain directly!";
  }
};
