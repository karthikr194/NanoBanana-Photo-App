import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImage, GenerativePart } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editImage(imagePart: GenerativePart, prompt: string): Promise<EditedImage> {
    try {
        const enhancedPrompt = `You are a helpful AI assistant with expert skills in photo editing. Your goal is to apply the user's requested edit to the provided image in a seamless, high-quality, and photorealistic way. Pay close attention to lighting, shadows, and textures to ensure the edit blends perfectly with the original image. Only return the edited image. Here is the user's request: "${prompt}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    imagePart,
                    { text: enhancedPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (!response.candidates || response.candidates.length === 0) {
            throw new Error("No content generated. The response may have been blocked.");
        }

        const candidate = response.candidates[0];
        let editedImageUrl: string | null = null;
        let responseText: string | null = null;
        
        for (const part of candidate.content.parts) {
            if (part.inlineData) {
                const base64ImageBytes = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                editedImageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
                responseText = part.text;
            }
        }

        if (!editedImageUrl) {
            throw new Error("The AI did not return an edited image. Please try a different prompt.");
        }

        return { imageUrl: editedImageUrl, text: responseText };

    } catch (error) {
        console.error("Error editing image with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}
