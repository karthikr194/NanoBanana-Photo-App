import React from 'react';
import type { EditedImage } from '../types';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  editedImage: EditedImage | null;
  isLoading: boolean;
}

const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full bg-base-200/50 rounded-lg p-8 border-2 border-dashed border-base-300 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-500 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h3 className="text-xl font-semibold text-white">Your edited image will appear here</h3>
        <p className="text-gray-400 mt-2">Upload an image and provide an editing prompt to get started.</p>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full bg-base-200/50 rounded-lg p-8 border-2 border-dashed border-base-300 text-center">
        <div className="w-12 h-12 border-4 border-t-brand-primary border-base-300 rounded-full animate-spin"></div>
        <h3 className="text-xl font-semibold text-white mt-6">AI is working its magic...</h3>
        <p className="text-gray-400 mt-2">This may take a moment. Please wait.</p>
    </div>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, editedImage, isLoading }) => {
  const handleDownload = () => {
    if (!editedImage?.imageUrl) return;

    const link = document.createElement('a');
    link.href = editedImage.imageUrl;
    
    const mimeType = editedImage.imageUrl.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1] || 'png';
    
    link.download = `edited-image-${Date.now()}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!originalImageUrl) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
        {editedImage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-400 mb-2">Original</h3>
                    <img src={originalImageUrl} alt="Original" className="w-full rounded-lg shadow-md aspect-square object-cover" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white mb-2">Edited Result</h3>
                    <img src={editedImage.imageUrl} alt="Edited" className="w-full rounded-lg shadow-xl aspect-square object-cover border-2 border-brand-secondary" />
                    <div className="mt-4 flex flex-col gap-3">
                        <button 
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            Download Image
                        </button>
                        {editedImage.text && <p className="text-sm text-gray-300 bg-base-200 p-3 rounded-md italic">{editedImage.text}</p>}
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">Awaiting Edit...</h3>
                <div className="flex items-center justify-center bg-base-200/50 rounded-lg p-8 border-2 border-dashed border-base-300">
                    <p className="text-gray-400">Your edited image will be displayed here once you apply an AI edit.</p>
                </div>
            </div>
        )}
    </div>
  );
};