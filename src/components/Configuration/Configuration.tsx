import React, { useState } from 'react';
import { User, Building2, Upload, Calendar, Palette, Shield } from 'lucide-react';

type ConfigTab = 'personal' | 'school' | 'import' | 'schedule' | 'periods' | 'appearance' | 'security';

const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConfigTab>('personal');
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuration</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu latéral */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'personal'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <User size={18} />
              <span>Informations personnelles</span>
            </button>
            
            <button
              onClick={() => setActiveTab('school')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'school'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Building2 size={18} />
              <span>Établissement</span>
            </button>
            
            <button
              onClick={() => setActiveTab('import')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'import'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Upload size={18} />
              <span>Importation CSV</span>
            </button>
            
            <button
              onClick={() => setActiveTab('schedule')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'schedule'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Calendar size={18} />
              <span>Emploi du temps</span>
            </button>
            
            <button
              onClick={() => setActiveTab('periods')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'periods'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Calendar size={18} />
              <span>Périodes & Vacances</span>
            </button>
            
            <button
              onClick={() => setActiveTab('appearance')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'appearance'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Palette size={18} />
              <span>Apparence</span>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'security'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Shield size={18} />
              <span>Sécurité</span>
            </button>
          </nav>
        </div>
        
        {/* Contenu */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          {activeTab === 'personal' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Informations personnelles</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.fr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matières enseignées
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Mathématiques, Physique"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'school' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Informations sur l'établissement</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'établissement
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Collège / Lycée ..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année scolaire
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024-2025"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Adresse complète de l'établissement"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'import' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Importation de fichiers CSV</h3>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <h4 className="font-semibold mb-2">Importer la liste des élèves</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Format CSV attendu: Nom, Prénom, Date de naissance, Classe
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Choisir un fichier
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <h4 className="font-semibold mb-2">Importer les compétences</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Format CSV attendu: Code, Nom, Description, Catégorie
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Choisir un fichier
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Paramètres de l'emploi du temps</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="font-medium">Utiliser des semaines alternées (A/B)</span>
                  </label>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Importation depuis iCal</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Entrez l'URL de téléchargement de votre fichier .ics pour synchroniser automatiquement votre emploi du temps.
                  </p>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/calendar.ics"
                  />
                  <button
                    type="button"
                    className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Importer depuis iCal
                  </button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Créneaux horaires</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="time" className="px-3 py-2 border border-gray-300 rounded-lg" defaultValue="08:00" />
                      <span>-</span>
                      <input type="time" className="px-3 py-2 border border-gray-300 rounded-lg" defaultValue="09:00" />
                      <button className="text-red-600 hover:text-red-700">Supprimer</button>
                    </div>
                  </div>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium">
                    + Ajouter un créneau
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'periods' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Périodes et vacances</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Périodes (Trimestres/Semestres)</h4>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Trimestre 1</span>
                          <span className="text-sm text-gray-600 ml-3">01/09/2024 - 20/12/2024</span>
                        </div>
                        <button className="text-red-600 hover:text-red-700">Supprimer</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium">
                    + Ajouter une période
                  </button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Vacances et jours fériés</h4>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Vacances de Noël</span>
                          <span className="text-sm text-gray-600 ml-3">21/12/2024 - 06/01/2025</span>
                        </div>
                        <button className="text-red-600 hover:text-red-700">Supprimer</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium">
                    + Ajouter des vacances
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Style et apparence</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thème
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Clair</option>
                    <option>Sombre</option>
                    <option>Automatique (système)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Outils disponibles
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Tableau de bord</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Plan de classe</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Évaluations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Vie scolaire</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Protocoles</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span>Widgets</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Sécurité</h3>
              
              <form className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> Modifiez régulièrement vos identifiants pour sécuriser l'accès à l'application.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirmer le mot de passe"
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span>Activer la connexion automatique (non recommandé sur un ordinateur partagé)</span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
