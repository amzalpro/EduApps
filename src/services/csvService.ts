/**
 * Service pour gérer les fichiers CSV
 * Version web-compatible avec support Tauri à venir
 */

export interface CSVImportResult {
  success: boolean;
  data: any[];
  errors?: string[];
}

/**
 * Ouvrir et lire un fichier CSV (version web)
 */
export const openCSVFile = async (): Promise<CSVImportResult> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        resolve({ success: false, data: [], errors: ['Aucun fichier sélectionné'] });
        return;
      }
      
      try {
        const content = await file.text();
        const data = parseCSV(content);
        resolve({ success: true, data });
      } catch (error) {
        resolve({ 
          success: false, 
          data: [], 
          errors: [`Erreur lors de la lecture du fichier: ${error}`] 
        });
      }
    };
    
    input.click();
  });
};

/**
 * Parser un contenu CSV
 */
export const parseCSV = (content: string): any[] => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj: any = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    data.push(obj);
  }

  return data;
};

/**
 * Sauvegarder des données en CSV (version web)
 */
export const saveCSVFile = async (data: any[], filename: string): Promise<boolean> => {
  try {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde CSV:', error);
    return false;
  }
};

/**
 * Convertir des données en format CSV
 */
export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Échapper les virgules et guillemets
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};

/**
 * Importer des élèves depuis un CSV
 */
export const importStudentsFromCSV = async () => {
  const result = await openCSVFile();
  
  if (!result.success) {
    return result;
  }

  // Mapper les données CSV vers le format Student
  const students = result.data.map((row, index) => ({
    id: row.id || `student-${Date.now()}-${index}`,
    firstName: row.prenom || row.firstName || '',
    lastName: row.nom || row.lastName || '',
    dateOfBirth: row.dateNaissance || row.dateOfBirth || '',
    classRoom: row.classe || row.classRoom || '',
    photo: row.photo || undefined,
  }));

  return { success: true, data: students };
};

/**
 * Importer des compétences depuis un CSV
 */
export const importCompetencesFromCSV = async () => {
  const result = await openCSVFile();
  
  if (!result.success) {
    return result;
  }

  // Mapper les données CSV vers le format Competence
  const competences = result.data.map((row, index) => ({
    id: row.id || `competence-${Date.now()}-${index}`,
    code: row.code || '',
    name: row.nom || row.name || '',
    description: row.description || '',
    category: row.categorie || row.category || '',
    level: row.niveau || row.level || undefined,
  }));

  return { success: true, data: competences };
};
