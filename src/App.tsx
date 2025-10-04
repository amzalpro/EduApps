import React, { useState } from 'react';
import { FormData, LevelConfig, ClassConfig, LayoutTemplate } from './types';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ColorPicker } from './components/ColorPicker';
import { HelpModal } from './components/HelpModal';
import { ClassBlock } from './components/ClassBlock';
import { LayoutEditor } from './components/LayoutEditor';
import { GeneratedPages } from './components/GeneratedPages';
import { mockTemplates, mockLevels } from './utils/mockData';
import { LEVEL_COLORS } from './utils/colors';
import { 
  BookOpen, 
  HelpCircle, 
  School, 
  Plus, 
  Wand2, 
  Printer, 
  FileText, 
  Upload, 
  Download, 
  ArrowLeft,
  Pen,
  Trash2
} from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({ title: '', status: '', progress: 0 });
  const [isGenerated, setIsGenerated] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeColorContext, setActiveColorContext] = useState<{ levelIndex: number; classIndex: number } | null>(null);
  const [helpModal, setHelpModal] = useState<{ isOpen: boolean; key: string }>({ isOpen: false, key: '' });
  const [layoutEditorOpen, setLayoutEditorOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<LayoutTemplate | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState<FormData>({
    teacherName: '',
    schoolName: '',
    academicYear: '2025-2026',
    subject: '',
    subjectCustom: '',
    periods: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'],
    coverImageUrl: '',
    layoutTemplates: {},
    levels: []
  });

  const helpTexts = {
    general: {
      title: 'Aide - Générateur de Carnet de Bord',
      content: [
        'Remplissez les informations générales (professeur, établissement, année scolaire, matière et périodes).',
        'Ajoutez des modèles de plan de classe pour pouvoir les associer ensuite à vos classes.',
        'Ajoutez vos niveaux et classes, saisissez le nombre d\'élèves, et (optionnel) la liste des élèves.',
        'Quand tout est prêt, cliquez sur « Générer le Carnet de Bord ».'
      ]
    },
    templates: {
      title: 'Aide - Modèles de Plan de Classe',
      content: [
        'Créez un ou plusieurs modèles (bus, îlots, etc.).',
        'Utilisez l\'éditeur pour placer des tables et le bureau du professeur. Les éléments s\'alignent sur une grille.',
        'Enregistrez le modèle, puis cochez-le dans la configuration des classes pour l\'inclure dans le carnet.'
      ]
    },
    levels: {
      title: 'Aide - Niveaux & Classes',
      content: [
        'Ajoutez un niveau (ex: 6ème) et choisissez une couleur pour le repérer.',
        'Saisissez la liste des classes (ex: 6A, 6B) séparées par des virgules.',
        'Pour chaque classe, configurez le type d\'évaluation, le nombre d\'élèves, la liste des élèves (optionnel), le nombre de pages de cahier de texte/notes et cochez les plans de classe à inclure.',
        'Pour les évaluations supplémentaires, choisissez le nombre de notes/compétences par trimestre et le système créera automatiquement le nombre de pages nécessaires.'
      ]
    }
  };

  const allClasses: ClassConfig[] = formData.levels.flatMap(level => level.classes);

  const generateDummyData = () => {
    setFormData({
      teacherName: 'M. Dupont',
      schoolName: 'Collège Jean Moulin',
      academicYear: '2025-2026',
      subject: 'Technologie',
      subjectCustom: '',
      periods: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'],
      coverImageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      layoutTemplates: mockTemplates,
      levels: mockLevels
    });
  };

  const addLevel = () => {
    const newLevel: LevelConfig = {
      name: '',
      classes: []
    };
    setFormData(prev => ({
      ...prev,
      levels: [...prev.levels, newLevel]
    }));
  };

  const updateLevel = (levelIndex: number, updates: Partial<LevelConfig>) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels.map((level, index) => 
        index === levelIndex ? { ...level, ...updates } : level
      )
    }));
  };

  const removeLevel = (levelIndex: number) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels.filter((_, index) => index !== levelIndex)
    }));
  };

  const updateLevelClasses = (levelIndex: number, classNames: string) => {
    const names = classNames.split(',').map(name => name.trim()).filter(name => name);
    const existingClasses = formData.levels[levelIndex]?.classes || [];
    
    const newClasses = names.map((name, index) => {
      const existing = existingClasses.find(cls => cls.name === name);
      return existing || {
        name,
        level: formData.levels[levelIndex].name,
        color: LEVEL_COLORS[index % LEVEL_COLORS.length],
        evalType: 'competences' as const,
        studentCount: 24,
        studentList: [],
        selectedPlans: [],
        cahierTextePages: 4,
        notesPages: 2,
        extraNotesPages: 0,
        extraCompetencesPages: 0
      };
    });

    updateLevel(levelIndex, { classes: newClasses });
  };

  const updateClassConfig = (levelIndex: number, classIndex: number, updates: Partial<ClassConfig>) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels.map((level, lIndex) => 
        lIndex === levelIndex 
          ? {
              ...level,
              classes: level.classes.map((cls, cIndex) =>
                cIndex === classIndex ? { ...cls, ...updates } : cls
              )
            }
          : level
      )
    }));
  };

  const openColorPicker = (levelIndex: number, classIndex: number) => {
    setActiveColorContext({ levelIndex, classIndex });
    setColorPickerOpen(true);
  };

  const handleColorSelect = (color: string) => {
    if (activeColorContext) {
      updateClassConfig(activeColorContext.levelIndex, activeColorContext.classIndex, { color });
    }
    setColorPickerOpen(false);
    setActiveColorContext(null);
  };

  const addTemplate = () => {
    setActiveTemplate({ name: '', data: [] });
    setLayoutEditorOpen(true);
  };

  const editTemplate = (templateName: string) => {
    const template = formData.layoutTemplates[templateName];
    if (template) {
      setActiveTemplate(template);
      setLayoutEditorOpen(true);
    }
  };

  const deleteTemplate = (templateName: string) => {
    setFormData(prev => {
      const newTemplates = { ...prev.layoutTemplates };
      delete newTemplates[templateName];
      return { ...prev, layoutTemplates: newTemplates };
    });
  };

  const saveTemplate = (template: LayoutTemplate) => {
    setFormData(prev => ({
      ...prev,
      layoutTemplates: {
        ...prev.layoutTemplates,
        [template.name]: template
      }
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value,
      subjectCustom: value === 'other' ? prev.subjectCustom : ''
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          coverImageUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLogbook = async () => {
    if (allClasses.length === 0) {
      alert('Veuillez ajouter au moins une classe.');
      return;
    }

    setIsLoading(true);
    setLoadingStatus({ title: 'Génération du carnet', status: 'Préparation...', progress: 0 });

    await new Promise(resolve => setTimeout(resolve, 100));
    setLoadingStatus({ title: 'Génération du carnet', status: 'Collecte des données...', progress: 20 });

    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingStatus({ title: 'Génération du carnet', status: 'Création des pages...', progress: 60 });

    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingStatus({ title: 'Génération du carnet', status: 'Finalisation...', progress: 90 });

    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    setIsGenerated(true);
  };

  const backToForm = () => {
    setIsGenerated(false);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carnet-config-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setFormData(importedData);
      } catch {
        alert('Erreur: Le fichier JSON est invalide ou corrompu.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (isGenerated) {
    return (
      <div className="min-h-screen bg-white">
        {/* Contrôles */}
        <div className="no-print fixed top-4 right-4 z-50 flex flex-col gap-3">
          <button 
            onClick={() => window.print()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </button>
          
          <button 
            onClick={exportJSON}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter JSON
          </button>
          
          <button 
            onClick={backToForm}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Modifier
          </button>
        </div>

        <GeneratedPages
          teacherName={formData.teacherName || 'Professeur'}
          schoolName={formData.schoolName}
          academicYear={formData.academicYear}
          subject={formData.subject === 'other' ? formData.subjectCustom : formData.subject || 'Matière'}
          periods={formData.periods}
          coverImageUrl={formData.coverImageUrl}
          classes={allClasses}
          templates={formData.layoutTemplates}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      {isLoading && (
        <LoadingOverlay
          title={loadingStatus.title}
          status={loadingStatus.status}
          progress={loadingStatus.progress}
        />
      )}

      <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Générateur de Carnet de Bord</h1>
            <button
              onClick={() => setHelpModal({ isOpen: true, key: 'general' })}
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-500">Personnalisez votre carnet pour l'année scolaire.</p>
        </div>

        {/* Informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b pb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du professeur</label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => setFormData(prev => ({ ...prev, teacherName: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="M. Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Collège/ Lycée..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Année scolaire</label>
            <input
              type="text"
              value={formData.academicYear}
              onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
            <select
              value={formData.subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Choisir une matière...</option>
              <option value="Technologie">Technologie</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Français">Français</option>
              <option value="Histoire-Géographie">Histoire-Géographie</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
              <option value="SVT">SVT</option>
              <option value="Anglais">Anglais</option>
              <option value="Espagnol">Espagnol</option>
              <option value="EPS">EPS</option>
              <option value="other">Autre...</option>
            </select>
            {formData.subject === 'other' && (
              <input
                type="text"
                value={formData.subjectCustom}
                onChange={(e) => setFormData(prev => ({ ...prev, subjectCustom: e.target.value }))}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Saisir la matière"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Périodes (séparées par des virgules)</label>
            <input
              type="text"
              value={formData.periods.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                periods: e.target.value.split(',').map(p => p.trim()).filter(p => p) 
              }))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Illustration de couverture</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Importer une image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <input
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImageUrl: e.target.value }))}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ou coller une URL d'image..."
              />
            </div>
            {formData.coverImageUrl && (
              <img 
                src={formData.coverImageUrl} 
                alt="Aperçu" 
                className="mt-2 max-h-20 rounded-md shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Modèles de plan de classe */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Modèles de Plan de Classe</h2>
            <button
              onClick={() => setHelpModal({ isOpen: true, key: 'templates' })}
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {Object.values(formData.layoutTemplates).map((template) => (
              <div
                key={template.name}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg shadow-sm border flex-grow basis-72"
              >
                <span className="font-medium text-gray-700">{template.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editTemplate(template.name)}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Pen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.name)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addTemplate}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <School className="w-4 h-4" />
            Créer un modèle
          </button>
        </div>

        {/* Niveaux et classes */}
        <div className="border-t pt-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Niveaux & Classes</h2>
            <button
              onClick={() => setHelpModal({ isOpen: true, key: 'levels' })}
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {formData.levels.map((level, levelIndex) => (
              <div key={levelIndex} className="p-4 border rounded-lg bg-slate-100 relative">
                <button
                  onClick={() => removeLevel(levelIndex)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Niveau</label>
                    <input
                      type="text"
                      value={level.name}
                      onChange={(e) => updateLevel(levelIndex, { name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 6ème"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Classes (séparées par des virgules)</label>
                    <input
                      type="text"
                      value={level.classes.map(cls => cls.name).join(', ')}
                      onChange={(e) => updateLevelClasses(levelIndex, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 6A, 6B, 6C"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {level.classes.map((classConfig, classIndex) => (
                    <ClassBlock
                      key={`${levelIndex}-${classIndex}`}
                      classConfig={classConfig}
                      templates={Object.keys(formData.layoutTemplates)}
                      onUpdate={(updates) => updateClassConfig(levelIndex, classIndex, updates)}
                      onOpenColorPicker={() => openColorPicker(levelIndex, classIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addLevel}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un niveau
          </button>
        </div>

        {/* Boutons d'action */}
        <div className="mt-10 pt-8 border-t flex justify-center items-center gap-4">
          <button
            onClick={generateDummyData}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transform transition hover:scale-105 text-lg flex items-center gap-2"
          >
            <Wand2 className="w-5 h-5" />
            Données Fictives
          </button>

          <label className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transform transition hover:scale-105 text-lg cursor-pointer flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importer JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            onClick={generateLogbook}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transform transition hover:scale-105 text-lg flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Générer le Carnet de Bord
          </button>
        </div>
      </div>

      {/* Modals */}
      <ColorPicker
        isOpen={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        onSelect={handleColorSelect}
      />

      <HelpModal
        isOpen={helpModal.isOpen}
        onClose={() => setHelpModal({ isOpen: false, key: '' })}
        title={helpTexts[helpModal.key as keyof typeof helpTexts]?.title || 'Aide'}
        content={helpTexts[helpModal.key as keyof typeof helpTexts]?.content || []}
      />

      <LayoutEditor
        template={activeTemplate}
        isOpen={layoutEditorOpen}
        onClose={() => {
          setLayoutEditorOpen(false);
          setActiveTemplate(null);
        }}
        onSave={saveTemplate}
      />
    </div>
  );
}

export default App;