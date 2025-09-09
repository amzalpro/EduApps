import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  title: string;
  status: string;
  progress: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ title, status, progress }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 text-white">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-lg mb-4">{status}</p>
        <div className="w-80 bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
          <div 
            className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};