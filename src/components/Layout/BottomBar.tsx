import React from 'react';

interface BottomBarProps {
  message?: string;
  stats?: {
    totalStudents?: number;
    currentClass?: string;
    lastSaved?: string;
  };
}

const BottomBar: React.FC<BottomBarProps> = ({ message, stats }) => {
  return (
    <div className="bg-gray-200 border-t border-gray-300 px-6 py-2 flex items-center justify-between text-sm text-gray-700">
      <div className="flex items-center space-x-6">
        {stats?.currentClass && (
          <span>
            <strong>Classe:</strong> {stats.currentClass}
          </span>
        )}
        {stats?.totalStudents && (
          <span>
            <strong>Élèves:</strong> {stats.totalStudents}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {message && <span className="text-gray-600">{message}</span>}
        {stats?.lastSaved && (
          <span className="text-gray-500">
            Dernière sauvegarde: {stats.lastSaved}
          </span>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
