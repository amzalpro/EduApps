import React, { useState } from 'react';
import TopBar from './TopBar';
import TabBar, { TabId } from './TabBar';
import BottomBar from './BottomBar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  onSave?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  onSave 
}) => {
  const [language, setLanguage] = useState('FR');
  
  const handleLanguageChange = () => {
    // TODO: Implémenter le changement de langue
    setLanguage(language === 'FR' ? 'EN' : 'FR');
  };
  
  const handleSettings = () => {
    // TODO: Ouvrir les paramètres
    onTabChange('configuration');
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar 
        onSave={onSave}
        onLanguageChange={handleLanguageChange}
        onSettings={handleSettings}
        currentLanguage={language}
      />
      
      <TabBar 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />
      
      <main className="flex-1 overflow-auto bg-white">
        {children}
      </main>
      
      <BottomBar 
        stats={{
          currentClass: '6ème A',
          totalStudents: 28,
          lastSaved: new Date().toLocaleTimeString('fr-FR')
        }}
      />
    </div>
  );
};

export default MainLayout;
