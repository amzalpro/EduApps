import React, { useState } from 'react';
import { UserX, Clock, AlertTriangle, XCircle, FileText } from 'lucide-react';

type SchoolLifeTab = 'absences' | 'retards' | 'punitions' | 'exclusions' | 'notes';

const SchoolLife: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SchoolLifeTab>('absences');
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vie scolaire</h2>
      
      {/* Sous-onglets */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('absences')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors whitespace-nowrap
              ${activeTab === 'absences'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <UserX size={18} />
            <span>Absences</span>
          </button>
          
          <button
            onClick={() => setActiveTab('retards')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors whitespace-nowrap
              ${activeTab === 'retards'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <Clock size={18} />
            <span>Retards</span>
          </button>
          
          <button
            onClick={() => setActiveTab('punitions')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors whitespace-nowrap
              ${activeTab === 'punitions'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <AlertTriangle size={18} />
            <span>Punitions</span>
          </button>
          
          <button
            onClick={() => setActiveTab('exclusions')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors whitespace-nowrap
              ${activeTab === 'exclusions'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <XCircle size={18} />
            <span>Exclusions</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notes')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors whitespace-nowrap
              ${activeTab === 'notes'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <FileText size={18} />
            <span>Notes personnelles</span>
          </button>
        </div>
      </div>
      
      {/* Contenu */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'absences' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Absences</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Ajouter une absence
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">Élève</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-center">Justifiée</th>
                    <th className="px-4 py-3 text-center">Parents notifiés</th>
                    <th className="px-4 py-3 text-left">Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Martin Dupont</td>
                    <td className="px-4 py-3">15/03/2024</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        Maladie
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600">✓</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600">✓</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Certificat médical fourni</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Sophie Laurent</td>
                    <td className="px-4 py-3">14/03/2024</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        Non justifié
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-red-600">✗</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600">✓</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Appel aux parents effectué</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'retards' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Retards</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Ajouter un retard
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">Élève</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Heure</th>
                    <th className="px-4 py-3 text-left">Durée</th>
                    <th className="px-4 py-3 text-center">Justifié</th>
                    <th className="px-4 py-3 text-left">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Lucas Martin</td>
                    <td className="px-4 py-3">16/03/2024</td>
                    <td className="px-4 py-3">08:15</td>
                    <td className="px-4 py-3">15 min</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600">✓</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Bus en retard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'punitions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Punitions</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Ajouter une punition
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">Marie Dubois - Retenue</h4>
                    <p className="text-sm text-gray-600 mt-1">Bavardages répétés pendant le cours</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-gray-500">Date: 20/03/2024 à 17h00</span>
                      <span className="text-gray-500">Durée: 1h</span>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Planifiée
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'exclusions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Exclusions</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Ajouter une exclusion
              </button>
            </div>
            
            <div className="text-center text-gray-500 py-8">
              Aucune exclusion enregistrée
            </div>
          </div>
        )}
        
        {activeTab === 'notes' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Notes personnelles</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Nouvelle note
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold">Réunion avec les parents de Thomas</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Discussion sur l'amélioration des résultats. Parents très coopératifs.
                  Mise en place d'un suivi hebdomadaire.
                </p>
                <p className="text-xs text-gray-400 mt-2">12/03/2024 - 15:30</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold">Observation générale 6ème A</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Classe dynamique mais parfois bruyante. Nécessité de revoir le plan de classe.
                </p>
                <p className="text-xs text-gray-400 mt-2">10/03/2024 - 09:15</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolLife;
