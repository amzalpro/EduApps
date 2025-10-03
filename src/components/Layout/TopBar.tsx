import React from 'react';
import { Save, Globe, Settings } from 'lucide-react';

interface TopBarProps {
  onSave?: () => void;
  onLanguageChange?: () => void;
  onSettings?: () => void;
  currentLanguage?: string;
}

const TopBar: React.FC<TopBarProps> = ({ 
  onSave, 
  onLanguageChange, 
  onSettings,
  currentLanguage = 'FR' 
}) => {
  return (
    <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">EduApps - Gestion Scolaire</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          title="Enregistrer"
        >
          <Save size={18} />
          <span>Enregistrer</span>
        </button>
        
        <button
          onClick={onLanguageChange}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          title="Changer de langue"
        >
          <Globe size={18} />
          <span>{currentLanguage}</span>
        </button>
        
        <button
          onClick={onSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          title="Paramètres"
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
