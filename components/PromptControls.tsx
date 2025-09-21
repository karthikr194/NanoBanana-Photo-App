import React from 'react';
import { Loader } from './Loader';

const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118A2.25 2.25 0 0 1 .879 16.5a2.25 2.25 0 0 1 2.25-2.25a2.25 2.25 0 0 1 2.118 2.475c.362.069.69.215.993.415a3 3 0 0 0 2.126-1.854M15.82 8.35a3 3 0 0 0-2.126-1.854.837.837 0 0 1-.645-.645 3 3 0 0 0-1.854-2.126 3 3 0 0 0-1.128-5.78 2.25 2.25 0 0 1-2.118-2.475A2.25 2.25 0 0 1 7.5.879a2.25 2.25 0 0 1 2.25 2.25c0 .596.223 1.159.645 1.576a3 3 0 0 0 1.854 2.126 3 3 0 0 0 5.78 1.128 2.25 2.25 0 0 1 2.475 2.118 2.25 2.25 0 0 1-.879 2.25a2.25 2.25 0 0 1-2.25 2.25 2.25 2.25 0 0 1-2.118-2.475 3 3 0 0 0-.415-.993a3 3 0 0 0-1.854-2.126Z" />
    </svg>
);


interface PromptControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MAX_PROMPT_LENGTH = 500;

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, onPromptChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!isLoading) {
          onSubmit();
        }
    }
  };
  
  const charsLeft = MAX_PROMPT_LENGTH - prompt.length;
  const counterColor = charsLeft < 0 ? 'text-red-400' : charsLeft < 50 ? 'text-yellow-400' : 'text-gray-500';

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold mb-3">2. Describe Your Edit</h2>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'Add a pirate hat on the cat', 'Make it look like a watercolor painting', 'Change the background to a beach at sunset'"
          rows={4}
          maxLength={MAX_PROMPT_LENGTH}
          className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
         <p className={`text-right text-sm mt-1 font-medium ${counterColor}`}>
            {prompt.length}/{MAX_PROMPT_LENGTH}
        </p>
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <Loader />
            <span>Editing...</span>
          </>
        ) : (
          <>
            <WandIcon className="w-6 h-6" />
            <span>Apply AI Edit</span>
          </>
        )}
      </button>
    </div>
  );
};