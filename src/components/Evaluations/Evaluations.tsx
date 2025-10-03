import React, { useState } from 'react';
import { Plus, BookOpen, Award, FileText } from 'lucide-react';

type EvaluationType = 'competences' | 'notes' | 'bilans' | 'lettres';

const Evaluations: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<EvaluationType>('competences');
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Évaluations</h2>
        
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={18} />
          <span>Nouvelle évaluation</span>
        </button>
      </div>
      
      {/* Sous-onglets */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveSubTab('competences')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors
              ${activeSubTab === 'competences'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <Award size={18} />
            <span>Compétences</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors
              ${activeSubTab === 'notes'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <BookOpen size={18} />
            <span>Notes</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('bilans')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors
              ${activeSubTab === 'bilans'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <FileText size={18} />
            <span>Bilans</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('lettres')}
            className={`
              flex items-center space-x-2 px-6 py-3 font-medium transition-colors
              ${activeSubTab === 'lettres'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <FileText size={18} />
            <span>Modèles de lettres</span>
          </button>
        </div>
      </div>
      
      {/* Contenu selon l'onglet actif */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeSubTab === 'competences' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Évaluation par compétences</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">Élève</th>
                    <th className="px-4 py-3 text-left">Compétence</th>
                    <th className="px-4 py-3 text-center">Niveau</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Martin Dupont</td>
                    <td className="px-4 py-3">Calculer avec des nombres décimaux</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">A</span>
                    </td>
                    <td className="px-4 py-3">15/03/2024</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Très bien maîtrisé</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Sophie Laurent</td>
                    <td className="px-4 py-3">Résoudre des problèmes</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold">B</span>
                    </td>
                    <td className="px-4 py-3">15/03/2024</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Satisfaisant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeSubTab === 'notes' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notes</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">Élève</th>
                    <th className="px-4 py-3 text-left">Évaluation</th>
                    <th className="px-4 py-3 text-center">Note</th>
                    <th className="px-4 py-3 text-center">Coef.</th>
                    <th className="px-4 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Martin Dupont</td>
                    <td className="px-4 py-3">Contrôle - Fractions</td>
                    <td className="px-4 py-3 text-center font-semibold">16/20</td>
                    <td className="px-4 py-3 text-center">2</td>
                    <td className="px-4 py-3">12/03/2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">Sophie Laurent</td>
                    <td className="px-4 py-3">Contrôle - Fractions</td>
                    <td className="px-4 py-3 text-center font-semibold">14/20</td>
                    <td className="px-4 py-3 text-center">2</td>
                    <td className="px-4 py-3">12/03/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeSubTab === 'bilans' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Bilans périodiques</h3>
            
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">6ème A - Trimestre 1</h4>
                    <p className="text-sm text-gray-600">25 élèves évalués</p>
                  </div>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors">
                    Voir le bilan
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">6ème B - Trimestre 1</h4>
                    <p className="text-sm text-gray-600">22 élèves évalués</p>
                  </div>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors">
                    Voir le bilan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSubTab === 'lettres' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Modèles de lettres</h3>
            
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold">Lettre aux parents - Résultats insuffisants</h4>
                <p className="text-sm text-gray-600 mt-1">Modèle pour informer les parents des difficultés scolaires</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold">Lettre aux parents - Félicitations</h4>
                <p className="text-sm text-gray-600 mt-1">Modèle pour féliciter un élève et ses parents</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold">Convocation rendez-vous</h4>
                <p className="text-sm text-gray-600 mt-1">Modèle pour convoquer les parents à un rendez-vous</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evaluations;
