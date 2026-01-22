
import { GoogleGenAI, Type } from "@google/genai";
import { Tone, Discipline } from "../types";

export const generateArgument = async (
  topic: string,
  tones: Tone[],
  disciplines: Discipline[]
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const selectedDisciplines = disciplines.map(d => d.label).join(", ");
  const selectedTones = tones.join(" and ");

  const systemPrompt = `You are a facilitator for an intellectual debate platform called "The Big Argue". 
  Your goal is to simulate a concise, high-level debate about a specific topic.
  
  Topic: ${topic}
  Participants: Experts from the following fields: ${selectedDisciplines}.
  Tone: The entire debate must be conducted with a ${selectedTones} tone.
  
  Instructions:
  - Generate a back-and-forth argument between the selected disciplines.
  - Each discipline should have one clear, expert-level contribution.
  - Keep the responses concise (under 60 words per speaker).
  - Ensure the requested tone is palpable in every response.
  - Return the results as a list of arguments.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Start the debate now.",
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            speaker: { type: Type.STRING, description: "The name of the discipline" },
            text: { type: Type.STRING, description: "The concise argument text" }
          },
          required: ["speaker", "text"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse argument response", e);
    return [];
  }
};
