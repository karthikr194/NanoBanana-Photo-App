
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.25a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06l-.25.25a.75.75 0 11-1.06-1.06l.25-.25a.75.75 0 011.06 0zm9.192 0a.75.75 0 011.06 0l.25.25a.75.75 0 01-1.06 1.06l-.25-.25a.75.75 0 010-1.06zM10 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 4.5zM3.28 8.467a.75.75 0 011.06 0l.25.25a.75.75 0 11-1.06 1.06l-.25-.25a.75.75 0 010-1.06zM15.657 8.467a.75.75 0 011.06 0l.25.25a.75.75 0 11-1.06 1.06l-.25-.25a.75.75 0 010-1.06zM7.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM10 12.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.343 14.596a.75.75 0 011.06 0l.25.25a.75.75 0 01-1.06 1.06l-.25-.25a.75.75 0 010-1.06zm10.254 0a.75.75 0 011.06 0l.25.25a.75.75 0 11-1.06 1.06l-.25-.25a.75.75 0 010-1.06zM10 17.75a.75.75 0 01.75-.75h.25a.75.75 0 010 1.5h-.25a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-base-200/50 backdrop-blur-sm sticky top-0 z-10 border-b border-base-300">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center space-x-3">
                    <SparklesIcon className="w-8 h-8 text-brand-secondary" />
                    <h1 className="text-2xl font-bold tracking-tight text-white">AI Photo Editor</h1>
                    <span className="bg-brand-secondary/20 text-brand-secondary text-xs font-bold px-2 py-1 rounded-full">Nano</span>
                </div>
            </div>
        </header>
    );
};
