
import { GoogleGenAI, Type } from "@google/genai";

export const getCharacterSuggestion = async (description) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugiere un personaje icónico de cine para una fiesta de gala basado en esta descripción o vibe: "${description}". Responde solo con un JSON que tenga "name" y "reason" (max 15 palabras).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["name", "reason"]
        }
      }
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { name: "James Bond", reason: "Un clásico infalible para cualquier gala." };
  }
};
