
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { Alert } from './components/Alert';
import { editImage } from './services/geminiService';
import { EditedImage } from './types';
import { fileToGenerativePart } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<EditedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImage(null);
    setError(null);
  };

  const handleEditRequest = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError("Please upload an image and enter an editing prompt.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage);
      const result = await editImage(imagePart, prompt);
      setEditedImage(result);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-base-100 font-sans text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-6">
             <ImageUploader 
              onImageUpload={handleImageUpload} 
              imageUrl={originalImageUrl} 
              onReset={handleReset}
            />
            {originalImage && (
              <PromptControls 
                prompt={prompt}
                onPromptChange={setPrompt}
                onSubmit={handleEditRequest}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Display Column */}
          <div className="lg:col-span-8">
            {error && <Alert message={error} type="error" onClose={() => setError(null)} />}
            <ImageDisplay 
              originalImageUrl={originalImageUrl}
              editedImage={editedImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
