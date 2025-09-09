import React, { useState, useRef, useEffect } from 'react';
import { LayoutTemplate, LayoutElement } from '../types';
import { Square, Grid2x2, Grid3x3, UserCheck, Trash2 } from 'lucide-react';

interface LayoutEditorProps {
  template: LayoutTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: LayoutTemplate) => void;
}

export const LayoutEditor: React.FC<LayoutEditorProps> = ({ 
  template, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [templateName, setTemplateName] = useState('');
  const [elements, setElements] = useState<LayoutElement[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (template) {
      setTemplateName(template.name);
      setElements(template.data || []);
    } else {
      setTemplateName('');
      setElements([]);
    }
  }, [template]);

  const addElement = (type: LayoutElement['type']) => {
    const newElement: LayoutElement = {
      type,
      x: 40,
      y: 40,
      content: type === 'teacher-desk-item' ? '👨‍🏫' : ''
    };
    setElements([...elements, newElement]);
  };

  const moveElement = (index: number, x: number, y: number) => {
    const newElements = [...elements];
    newElements[index] = { ...newElements[index], x, y };
    setElements(newElements);
  };

  const removeElement = (index: number) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!templateName.trim()) return;
    
    onSave({
      name: templateName.trim(),
      data: elements
    });
    onClose();
  };

  const renderElement = (element: LayoutElement, index: number) => {
    const commonClasses = "absolute border-2 rounded-md cursor-move select-none flex items-center justify-center text-xs font-bold transition-all hover:shadow-lg";
    
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startElementX = element.x;
      const startElementY = element.y;
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!editorRef.current) return;
        
        const rect = editorRef.current.getBoundingClientRect();
        const deltaX = ((e.clientX - startX) / rect.width) * 100;
        const deltaY = ((e.clientY - startY) / rect.height) * 100;
        
        const newX = Math.max(0, Math.min(90, startElementX + deltaX));
        const newY = Math.max(0, Math.min(90, startElementY + deltaY));
        
        moveElement(index, newX, newY);
      };
      
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const baseStyle = {
      left: `${element.x}%`,
      top: `${element.y}%`
    };

    switch (element.type) {
      case 'desk':
        return (
          <div
            key={index}
            className={`${commonClasses} w-12 h-8 border-slate-400 bg-slate-200 hover:bg-slate-300 group`}
            style={baseStyle}
            onMouseDown={handleMouseDown}
          >
            <button
              onClick={() => removeElement(index)}
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        );
        
      case 'desk-pair':
        return (
          <div
            key={index}
            className="absolute group"
            style={{ ...baseStyle, width: '25%', height: '10%' }}
            onMouseDown={handleMouseDown}
          >
            <div className={`${commonClasses} w-12 h-8 border-slate-400 bg-slate-200`} style={{ position: 'absolute', left: 0, top: 0, width: '48%', height: '100%' }} />
            <div className={`${commonClasses} w-12 h-8 border-slate-400 bg-slate-200`} style={{ position: 'absolute', right: 0, top: 0, width: '48%', height: '100%' }} />
            <button
              onClick={() => removeElement(index)}
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        );
        
      case 'desk-block4':
        return (
          <div
            key={index}
            className="absolute group"
            style={{ ...baseStyle, width: '25%', height: '21%' }}
            onMouseDown={handleMouseDown}
          >
            <div className={`${commonClasses} border-slate-400 bg-slate-200`} style={{ position: 'absolute', left: 0, top: 0, width: '48%', height: '48%' }} />
            <div className={`${commonClasses} border-slate-400 bg-slate-200`} style={{ position: 'absolute', right: 0, top: 0, width: '48%', height: '48%' }} />
            <div className={`${commonClasses} border-slate-400 bg-slate-200`} style={{ position: 'absolute', left: 0, bottom: 0, width: '48%', height: '48%' }} />
            <div className={`${commonClasses} border-slate-400 bg-slate-200`} style={{ position: 'absolute', right: 0, bottom: 0, width: '48%', height: '48%' }} />
            <button
              onClick={() => removeElement(index)}
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        );
        
      case 'teacher-desk-item':
        return (
          <div
            key={index}
            className={`${commonClasses} w-24 h-12 border-orange-400 bg-orange-100 hover:bg-orange-200 text-orange-800 group`}
            style={baseStyle}
            onMouseDown={handleMouseDown}
          >
            {element.content}
            <button
              onClick={() => removeElement(index)}
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <label className="text-2xl font-bold text-gray-800">Modèle:</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-xl font-bold text-gray-800 w-64"
              placeholder="Nom du modèle..."
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex gap-6 h-96">
          <div className="w-1/4 space-y-3">
            <h3 className="font-semibold">Ajouter des éléments</h3>
            
            <button
              onClick={() => addElement('desk')}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Table seule
            </button>
            
            <button
              onClick={() => addElement('desk-pair')}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Grid2x2 className="w-4 h-4" />
              Paire de tables
            </button>
            
            <button
              onClick={() => addElement('desk-block4')}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Grid3x3 className="w-4 h-4" />
              Îlot de 4
            </button>
            
            <button
              onClick={() => addElement('teacher-desk-item')}
              className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 mt-4"
            >
              <UserCheck className="w-4 h-4" />
              Bureau Prof.
            </button>
            
            <button
              onClick={() => setElements([])}
              className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mt-8"
            >
              <Trash2 className="w-4 h-4" />
              Vider la zone
            </button>
          </div>
          
          <div className="w-3/4">
            <div
              ref={editorRef}
              className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg relative overflow-hidden"
            >
              {elements.map((element, index) => renderElement(element, index))}
            </div>
          </div>
        </div>
        
        <div className="text-right mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!templateName.trim()}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};