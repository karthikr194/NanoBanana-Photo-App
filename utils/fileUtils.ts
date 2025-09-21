
import type { GenerativePart } from '../types';

export function fileToGenerativePart(file: File): Promise<GenerativePart> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      try {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        if (!base64Data) {
            throw new Error("Could not extract base64 data from file.");
        }
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
