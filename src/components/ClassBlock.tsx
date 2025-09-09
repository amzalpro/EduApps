import React from 'react';
import { ClassConfig } from '../types';
import { Palette } from 'lucide-react';

interface ClassBlockProps {
  classConfig: ClassConfig;
  templates: string[];
  onUpdate: (updates: Partial<ClassConfig>) => void;
  onOpenColorPicker: () => void;
}

export const ClassBlock: React.FC<ClassBlockProps> = ({ 
  classConfig, 
  templates, 
  onUpdate,
  onOpenColorPicker 
}) => {
  const handleEvalTypeChange = (evalType: ClassConfig['evalType']) => {
    onUpdate({ evalType });
  };

  const handleStudentListChange = (value: string) => {
    const studentList = value.split('\n').map(name => name.trim()).filter(name => name);
    onUpdate({ studentList });
  };

  const handleTemplateChange = (templateName: string, checked: boolean) => {
    const selectedPlans = checked
      ? [...classConfig.selectedPlans, templateName]
      : classConfig.selectedPlans.filter(plan => plan !== templateName);
    onUpdate({ selectedPlans });
  };

  const showExtraNotesOptions = classConfig.evalType === 'notes' || classConfig.evalType === 'notes_competences';
  const showExtraCompetencesOptions = classConfig.evalType === 'competences' || classConfig.evalType === 'notes_competences';

  return (
    <div className="p-4 border rounded-lg bg-white relative">
      <h4 className="font-bold text-lg mb-3">{classConfig.name}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Couleur de la classe</label>
          <button
            type="button"
            className="w-full h-8 rounded-md border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            style={{ backgroundColor: classConfig.color }}
            onClick={onOpenColorPicker}
          >
            <Palette className="w-4 h-4 text-white mix-blend-difference" />
          </button>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type d'évaluation</label>
          <select
            value={classConfig.evalType}
            onChange={(e) => handleEvalTypeChange(e.target.value as ClassConfig['evalType'])}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="competences">Compétences</option>
            <option value="notes">Notes</option>
            <option value="notes_competences">Notes + Compétences</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Nb. Élèves</label>
          <input
            type="number"
            value={classConfig.studentCount}
            onChange={(e) => onUpdate({ studentCount: parseInt(e.target.value, 10) || 24 })}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            min="1"
            max="40"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Pages de Notes</label>
          <input
            type="number"
            value={classConfig.notesPages}
            onChange={(e) => onUpdate({ notesPages: parseInt(e.target.value, 10) || 2 })}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            min="0"
            max="50"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Cahier de texte</label>
          <input
            type="number"
            value={classConfig.cahierTextePages}
            onChange={(e) => onUpdate({ cahierTextePages: parseInt(e.target.value, 10) || 4 })}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            min="0"
            max="50"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Liste des élèves</label>
          <textarea
            value={classConfig.studentList.join('\n')}
            onChange={(e) => handleStudentListChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            rows={5}
            placeholder="Un nom par ligne..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Plans de Classe</label>
          <div className="space-y-1 p-2 bg-gray-100 rounded-md border min-h-[120px]">
            {templates.length === 0 ? (
              <span className="text-xs text-gray-500">Créez des modèles de plan pour les voir apparaître ici.</span>
            ) : (
              templates.map((template) => (
                <div key={template} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${classConfig.name}-${template}`}
                    checked={classConfig.selectedPlans.includes(template)}
                    onChange={(e) => handleTemplateChange(template, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`${classConfig.name}-${template}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {template}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-sm text-gray-700 mb-2">Évaluations Supplémentaires</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {showExtraNotesOptions && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nb. notes par trimestre</label>
              <select
                value={classConfig.extraNotesPages}
                onChange={(e) => onUpdate({ extraNotesPages: parseInt(e.target.value, 10) })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">1 page pour 10 notes</p>
            </div>
          )}
          
          {showExtraCompetencesOptions && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nb. compétences par trimestre</label>
              <select
                value={classConfig.extraCompetencesPages}
                onChange={(e) => onUpdate({ extraCompetencesPages: parseInt(e.target.value, 10) })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">1 page pour 10 compétences</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};