
import React from 'react';

interface AlertProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}

const alertStyles = {
  error: 'bg-red-900/50 border-red-500 text-red-200',
  success: 'bg-green-900/50 border-green-500 text-green-200',
  info: 'bg-blue-900/50 border-blue-500 text-blue-200',
};

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);


export const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  return (
    <div className={`flex items-center justify-between p-4 mb-4 border rounded-lg ${alertStyles[type]}`} role="alert">
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/10 transition-colors">
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
