import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  AlertCircle, 
  FileText, 
  Puzzle, 
  Settings 
} from 'lucide-react';

export type TabId = 
  | 'dashboard' 
  | 'classroom' 
  | 'evaluations' 
  | 'schoollife' 
  | 'protocols' 
  | 'widgets' 
  | 'configuration';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const tabs: Tab[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
  { id: 'classroom', label: 'Plan de classe', icon: <Users size={18} /> },
  { id: 'evaluations', label: 'Évaluations', icon: <ClipboardCheck size={18} /> },
  { id: 'schoollife', label: 'Vie scolaire', icon: <AlertCircle size={18} /> },
  { id: 'protocols', label: 'Protocoles', icon: <FileText size={18} /> },
  { id: 'widgets', label: 'Widgets', icon: <Puzzle size={18} /> },
  { id: 'configuration', label: 'Configuration', icon: <Settings size={18} /> },
];

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-100 border-b border-gray-300 px-4">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-t-lg transition-colors
              ${activeTab === tab.id
                ? 'bg-white text-blue-600 font-semibold border-t-2 border-x border-blue-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
