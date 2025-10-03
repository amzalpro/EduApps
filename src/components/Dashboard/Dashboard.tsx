import React, { useState } from 'react';
import { Calendar, Clock, Bell, BookOpen, Eye, EyeOff } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [classModeEnabled, setClassModeEnabled] = useState(false);
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
        
        <button
          onClick={() => setClassModeEnabled(!classModeEnabled)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
            ${classModeEnabled 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }
          `}
        >
          {classModeEnabled ? <Eye size={18} /> : <EyeOff size={18} />}
          <span>{classModeEnabled ? 'Mode Classe activé' : 'Activer Mode Classe'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Emploi du temps - 40% */}
        <div className="lg:col-span-4 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="text-xl font-semibold">Emploi du temps</h3>
          </div>
          
          <div className="space-y-3">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day) => (
              <div key={day} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded">
                <h4 className="font-medium text-gray-800">{day}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <p>08h00 - 09h00: Mathématiques (6ème A)</p>
                  <p>09h15 - 10h15: Mathématiques (6ème B)</p>
                  <p>10h30 - 11h30: Mathématiques (5ème A)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pense-bête et agenda - 30% */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="text-green-600" size={24} />
            <h3 className="text-xl font-semibold">Pense-bête & Agenda</h3>
          </div>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
              <p className="font-medium text-gray-800">Réunion parents</p>
              <p className="text-sm text-gray-600">Vendredi 18h00</p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="font-medium text-gray-800">Conseil de classe</p>
              <p className="text-sm text-gray-600">Mardi 15h30</p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="font-medium text-gray-800">Formation pédagogique</p>
              <p className="text-sm text-gray-600">Mercredi après-midi</p>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 rounded-lg transition-colors">
            + Ajouter une note
          </button>
        </div>
        
        {/* Rappels et alertes - 30% */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="text-red-600" size={24} />
            <h3 className="text-xl font-semibold">Rappels & Alertes</h3>
          </div>
          
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-red-600" />
                <p className="font-medium text-gray-800">3 Retenues à planifier</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Élèves: Martin D., Sophie L., Lucas M.</p>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
              <p className="font-medium text-gray-800">5 Rendez-vous parents</p>
              <p className="text-sm text-gray-600 mt-1">Cette semaine</p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="font-medium text-gray-800">Devoir à corriger</p>
              <p className="text-sm text-gray-600 mt-1">6ème A - Contrôle de mathématiques</p>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
              <p className="font-medium text-gray-800">2 Appels téléphoniques</p>
              <p className="text-sm text-gray-600 mt-1">Parents à contacter</p>
            </div>
          </div>
        </div>
      </div>
      
      {classModeEnabled && (
        <div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
          <strong>Mode Classe activé:</strong> Les informations personnelles des élèves sont masquées pour la projection.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
