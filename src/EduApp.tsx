import { useState } from 'react';
import Login from './components/Auth/Login';
import MainLayout from './components/Layout/MainLayout';
import { TabId } from './components/Layout/TabBar';
import { useAuthStore } from './stores/authStore';

// Import des composants de sections
import Dashboard from './components/Dashboard/Dashboard';
import ClassRoom from './components/ClassRoom/ClassRoom';
import Evaluations from './components/Evaluations/Evaluations';
import SchoolLife from './components/SchoolLife/SchoolLife';
import Protocols from './components/Protocols/Protocols';
import Widgets from './components/Widgets/Widgets';
import Configuration from './components/Configuration/Configuration';

function EduApp() {
  const { isAuthenticated, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const handleLogin = (username: string, password: string, role: 'enseignant' | 'admin') => {
    login(username, password, role);
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde avec Tauri
    console.log('Sauvegarde en cours...');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'classroom':
        return <ClassRoom />;
      case 'evaluations':
        return <Evaluations />;
      case 'schoollife':
        return <SchoolLife />;
      case 'protocols':
        return <Protocols />;
      case 'widgets':
        return <Widgets />;
      case 'configuration':
        return <Configuration />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <MainLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onSave={handleSave}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default EduApp;
