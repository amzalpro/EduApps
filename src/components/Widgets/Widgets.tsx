import React from 'react';
import { Gamepad2, BookOpen, Globe, QrCode, Star } from 'lucide-react';

const Widgets: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Widgets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Jeux éducatifs */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Gamepad2 className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Jeux éducatifs</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Accédez à une collection de jeux éducatifs pour dynamiser vos cours.
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
        
        {/* Annuaire */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Annuaire</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Contacts des collègues, administration et services de l'établissement.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
        
        {/* Dictionnaire */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Dictionnaire</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Accès rapide aux dictionnaires en ligne et ressources linguistiques.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
        
        {/* Sites favoris */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Star className="text-orange-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Sites favoris</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Vos sites web préférés pour l'enseignement et la préparation de cours.
          </p>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
        
        {/* Générateur QR Code */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <QrCode className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Générateur QR Code</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Créez des QR codes pour SMS, email, WhatsApp, calendrier, liens web, etc.
          </p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
        
        {/* Ressources web */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Globe className="text-teal-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold">Ressources web</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Liens vers des ressources pédagogiques et outils en ligne utiles.
          </p>
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition-colors">
            Ouvrir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
