import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

const Protocols: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Protocoles (PAI, PAP, etc.)</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Élèves avec protocoles</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            + Ajouter un protocole
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="text-blue-600" size={24} />
                  <h4 className="text-lg font-semibold">Emma Bernard</h4>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    PAI
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">
                  <strong>Protocole:</strong> Allergie aux arachides
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-yellow-800">Actions à entreprendre:</p>
                      <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                        <li>Vérifier la composition des aliments lors des activités</li>
                        <li>Avoir une trousse d'urgence à disposition</li>
                        <li>Prévenir immédiatement les parents et l'infirmerie en cas de réaction</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Date de début: 01/09/2023</span>
                  <span>Date de fin: 30/06/2024</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="text-green-600" size={24} />
                  <h4 className="text-lg font-semibold">Lucas Petit</h4>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    PAP
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">
                  <strong>Protocole:</strong> Dyslexie - Aménagements pédagogiques
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-blue-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-blue-800">Actions à entreprendre:</p>
                      <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                        <li>Utiliser une police adaptée (Arial 14)</li>
                        <li>Accorder un tiers-temps supplémentaire lors des évaluations</li>
                        <li>Privilégier les évaluations orales quand possible</li>
                        <li>Fournir les documents en version numérique</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Date de début: 01/09/2023</span>
                  <span>Date de fin: 30/06/2024</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="text-purple-600" size={24} />
                  <h4 className="text-lg font-semibold">Sarah Moreau</h4>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    PPRE
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">
                  <strong>Protocole:</strong> Difficultés en mathématiques
                </p>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-3 mb-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-purple-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-purple-800">Actions à entreprendre:</p>
                      <ul className="text-sm text-purple-700 mt-1 list-disc list-inside">
                        <li>Séances de soutien: Mardi et Jeudi 16h-17h</li>
                        <li>Exercices différenciés adaptés au niveau</li>
                        <li>Valoriser les progrès même minimes</li>
                        <li>Point hebdomadaire avec les parents</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Date de début: 15/01/2024</span>
                  <span>Date de fin: 30/06/2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocols;
