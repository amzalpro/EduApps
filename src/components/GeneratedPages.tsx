import React from 'react';
import { ClassConfig, LayoutTemplate } from '../types';
import { hexToRgba } from '../utils/colors';

interface GeneratedPagesProps {
  teacherName: string;
  schoolName: string;
  academicYear: string;
  subject: string;
  periods: string[];
  coverImageUrl: string;
  classes: ClassConfig[];
  templates: Record<string, LayoutTemplate>;
}

export const GeneratedPages: React.FC<GeneratedPagesProps> = ({
  teacherName,
  schoolName,
  academicYear,
  subject,
  periods,
  coverImageUrl,
  classes,
  templates
}) => {
  let pageCounter = 0;

  const renderCoverPage = () => {
    pageCounter++;
    return (
      <div key="cover" className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
          <div className="text-4xl font-bold text-indigo-600 mb-4 flex items-center gap-3">
            📚 Carnet de Bord
          </div>
          <div className="text-2xl font-semibold text-purple-600 mb-8">{subject}</div>
          
          {coverImageUrl && (
            <div className="mb-8">
              <img 
                src={coverImageUrl}
                alt="Illustration"
                className="max-w-md max-h-64 object-contain rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className="bg-indigo-100 text-indigo-800 text-2xl font-bold px-8 py-4 rounded-xl mb-12">
            {academicYear}
          </div>
          
          <div className="space-y-4">
            <div className="text-lg text-gray-600">Professeur:</div>
            <div className="text-xl font-semibold text-gray-800">{teacherName}</div>
            {schoolName && (
              <>
                <div className="text-lg text-gray-600 mt-6">Établissement:</div>
                <div className="text-lg font-semibold text-gray-800">{schoolName}</div>
              </>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderBlankPage = () => {
    pageCounter++;
    return (
      <div key="blank" className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderSommaire = () => {
    pageCounter++;
    const groupedByLevel = classes.reduce((acc, cls) => {
      (acc[cls.level] = acc[cls.level] || []).push(cls);
      return acc;
    }, {} as Record<string, ClassConfig[]>);

    let currentPage = pageCounter + 1;

    return (
      <div key="sommaire" className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-indigo-600 flex items-center justify-center gap-3">
            📋 Sommaire
          </div>
        </div>
        
        <div className="px-8 space-y-6">
          {Object.entries(groupedByLevel).map(([levelName, levelClasses]) => (
            <div key={levelName} className="bg-slate-50 rounded-lg p-4 shadow-sm">
              <div className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                🎓 Classes de {levelName}
              </div>
              
              <div className="space-y-2">
                {levelClasses.map((cls) => (
                  <div key={cls.name} className="flex justify-between items-center py-2">
                    <span className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: cls.color }}
                      />
                      {cls.name}
                    </span>
                    <span className="bg-slate-200 px-2 py-1 rounded text-sm font-medium">
                      Page {currentPage++}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderClassroomLayout = (cls: ClassConfig, planName: string) => {
    pageCounter++;
    const template = templates[planName];
    
    return (
      <div key={`${cls.name}-plan-${planName}`} className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        
        <div 
          className="text-white p-4 mb-4 rounded-lg shadow-lg relative overflow-hidden"
          style={{ 
            backgroundColor: cls.color,
            boxShadow: `0 4px 12px ${hexToRgba(cls.color, 0.3)}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="relative z-10 text-lg font-bold flex items-center gap-2">
            🗺️ Plan de Classe: {cls.name} ({planName})
          </div>
        </div>
        
        <div className="flex-grow border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 relative p-4">
          {template?.data.map((element, index) => {
            const baseStyle = {
              position: 'absolute' as const,
              left: `${element.x}%`,
              top: `${element.y}%`
            };

            switch (element.type) {
              case 'desk':
                return (
                  <div
                    key={index}
                    className="w-12 h-8 border-2 border-slate-400 bg-slate-200 rounded flex items-center justify-center text-xs"
                    style={baseStyle}
                  />
                );
                
              case 'desk-pair':
                return (
                  <div key={index} style={{ ...baseStyle, width: '25%', height: '10%' }}>
                    <div className="absolute left-0 top-0 w-[48%] h-full border-2 border-slate-400 bg-slate-200 rounded" />
                    <div className="absolute right-0 top-0 w-[48%] h-full border-2 border-slate-400 bg-slate-200 rounded" />
                  </div>
                );
                
              case 'desk-block4':
                return (
                  <div key={index} style={{ ...baseStyle, width: '25%', height: '21%' }}>
                    <div className="absolute left-0 top-0 w-[48%] h-[48%] border-2 border-slate-400 bg-slate-200 rounded" />
                    <div className="absolute right-0 top-0 w-[48%] h-[48%] border-2 border-slate-400 bg-slate-200 rounded" />
                    <div className="absolute left-0 bottom-0 w-[48%] h-[48%] border-2 border-slate-400 bg-slate-200 rounded" />
                    <div className="absolute right-0 bottom-0 w-[48%] h-[48%] border-2 border-slate-400 bg-slate-200 rounded" />
                  </div>
                );
                
              case 'teacher-desk-item':
                return (
                  <div
                    key={index}
                    className="w-24 h-12 border-3 border-orange-400 bg-orange-100 rounded flex items-center justify-center text-lg font-bold text-orange-800"
                    style={baseStyle}
                  >
                    {element.content}
                  </div>
                );
                
              default:
                return null;
            }
          })}
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderEvaluationPage = (cls: ClassConfig, period: string, evalType: 'notes' | 'competences') => {
    pageCounter++;
    const headerLabel = evalType === 'notes' ? 'Éval.' : 'Comp.';
    const periodTitle = cls.evalType === 'notes_competences' 
      ? `${period} (${evalType === 'notes' ? 'Notes' : 'Compétences'})`
      : period;

    return (
      <div key={`${cls.name}-eval-${period}-${evalType}`} className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        
        <div 
          className="text-white p-4 mb-4 rounded-lg shadow-lg relative overflow-hidden"
          style={{ 
            backgroundColor: cls.color,
            boxShadow: `0 4px 12px ${hexToRgba(cls.color, 0.3)}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="relative z-10 text-lg font-bold flex items-center gap-2">
            ✏️ Évaluations: {cls.name} - {periodTitle}
          </div>
        </div>
        
        <div className="flex-grow">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="w-12 border border-slate-300 bg-slate-100 p-2 text-center">N°</th>
                <th className="w-48 border border-slate-300 bg-slate-100 p-2 text-left">Nom de l'élève</th>
                {Array.from({ length: 10 }, (_, i) => (
                  <th key={i} className="border border-slate-300 bg-slate-100 p-1 text-center text-xs">
                    {headerLabel} {i + 1}
                  </th>
                ))}
                <th className="w-20 border border-slate-300 bg-slate-100 p-2 text-center">Moyenne</th>
              </tr>
              <tr className="h-16">
                <td colSpan={2} className="border border-slate-300 text-xs text-gray-500 font-semibold text-right pr-2 align-top">
                  Intitulés →
                </td>
                {Array.from({ length: 10 }, (_, i) => (
                  <td key={i} className="border border-slate-300 bg-white" />
                ))}
                <td className="border border-slate-300" />
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: cls.studentCount }, (_, i) => (
                <tr key={i} className="h-6">
                  <td className="border border-slate-300 text-center p-1">{i + 1}</td>
                  <td className="border border-slate-300 p-1 text-xs">
                    {cls.studentList[i] || ''}
                  </td>
                  {Array.from({ length: 10 }, (_, j) => (
                    <td key={j} className="border border-slate-300" />
                  ))}
                  <td className="border border-slate-300" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderCahierTexte = (cls: ClassConfig, pageNum: number) => {
    pageCounter++;
    return (
      <div key={`${cls.name}-cahier-${pageNum}`} className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        
        <div 
          className="text-white p-4 mb-4 rounded-lg shadow-lg relative overflow-hidden"
          style={{ 
            backgroundColor: cls.color,
            boxShadow: `0 4px 12px ${hexToRgba(cls.color, 0.3)}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="relative z-10 text-lg font-bold flex items-center gap-2">
            📝 Cahier de Texte: {cls.name}
          </div>
        </div>
        
        <div className="text-right mb-2 text-sm text-gray-600">
          Page {pageNum}/{cls.cahierTextePages}
        </div>
        
        <div className="flex-grow">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/3 border border-slate-300 bg-slate-100 p-3 text-left">Date</th>
                <th className="w-2/3 border border-slate-300 bg-slate-100 p-3 text-left">Contenu de la séance & Devoirs</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, i) => (
                <tr key={i} className="h-12">
                  <td className="border border-slate-300 p-2" />
                  <td className="border border-slate-300 p-2" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderNotesPage = (cls: ClassConfig, pageNum: number) => {
    pageCounter++;
    return (
      <div key={`${cls.name}-notes-${pageNum}`} className="a4-page">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
        
        <div 
          className="text-white p-4 mb-4 rounded-lg shadow-lg relative overflow-hidden"
          style={{ 
            backgroundColor: cls.color,
            boxShadow: `0 4px 12px ${hexToRgba(cls.color, 0.3)}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="relative z-10 text-lg font-bold flex items-center gap-2">
            📄 Notes: {cls.name}
          </div>
        </div>
        
        <div className="text-right mb-4 text-sm text-gray-600">
          Page {pageNum}/{cls.notesPages}
        </div>
        
        <div className="flex-grow bg-white rounded-lg p-4 shadow-sm" style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #e2e8f0 23px, #e2e8f0 24px)',
          backgroundPosition: 'top 10px center'
        }}>
          {/* Zone de lignes pour écriture */}
        </div>
        
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-sm text-gray-500">
          <span>Carnet de Bord {subject} - {academicYear}</span>
          <span>Page {pageCounter}</span>
        </div>
      </div>
    );
  };

  const renderPages = () => {
    const pages = [];

    // Page de couverture
    pages.push(renderCoverPage());
    
    // Page blanche
    pages.push(renderBlankPage());
    
    // Sommaire
    pages.push(renderSommaire());

    // Pages pour chaque classe
    classes.forEach((cls) => {
      // 1. Plans de classe
      cls.selectedPlans.forEach(planName => {
        pages.push(renderClassroomLayout(cls, planName));
      });

      // 2. Pages d'évaluation
      const evalTypesToGen = cls.evalType === 'notes_competences' 
        ? ['notes' as const, 'competences' as const] 
        : [cls.evalType];
      
      periods.forEach(period => {
        evalTypesToGen.forEach(type => {
          pages.push(renderEvaluationPage(cls, period, type));
          
          // Pages supplémentaires
          if (type === 'notes' && cls.extraNotesPages > 0) {
            const extraPagesCount = Math.ceil(cls.extraNotesPages / 10);
            for (let i = 0; i < extraPagesCount; i++) {
              pages.push(renderEvaluationPage(cls, `${period} (Notes supplémentaires)`, type));
            }
          }
          
          if (type === 'competences' && cls.extraCompetencesPages > 0) {
            const extraPagesCount = Math.ceil(cls.extraCompetencesPages / 10);
            for (let i = 0; i < extraPagesCount; i++) {
              pages.push(renderEvaluationPage(cls, `${period} (Compétences supplémentaires)`, type));
            }
          }
        });
      });

      // 3. Cahier de texte
      for (let i = 1; i <= cls.cahierTextePages; i++) {
        pages.push(renderCahierTexte(cls, i));
      }

      // 4. Pages de notes
      for (let i = 1; i <= cls.notesPages; i++) {
        pages.push(renderNotesPage(cls, i));
      }
    });

    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .a4-page {
          width: 210mm;
          height: 297mm;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          margin: 20px auto;
          padding: 8mm;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e8f0;
        }
        
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .a4-page { 
            box-shadow: none; 
            margin: 0; 
            page-break-after: always; 
            border: none; 
          }
          .a4-page:last-child { page-break-after: auto; }
          .no-print { display: none !important; }
        }
      `}</style>
      
      {renderPages()}
    </div>
  );
};