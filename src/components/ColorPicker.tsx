import React from 'react';
import { LEVEL_COLORS } from '../utils/colors';

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Choisir une couleur</h3>
        <div className="grid grid-cols-10 gap-2">
          {LEVEL_COLORS.map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all"
              style={{ backgroundColor: color }}
              onClick={() => {
                onSelect(color);
                onClose();
              }}
            />
          ))}
        </div>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};