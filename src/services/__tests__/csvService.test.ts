import { describe, expect, it } from 'vitest';
import { convertToCSV, parseCSV } from '../csvService';

describe('csvService', () => {
  it('parseCSV transforme un CSV simple en tableau d\'objets', () => {
    const content = 'id,prenom,nom\n1,Alice,Martin\n2,Bob,Durand\n';

    const result = parseCSV(content);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: '1', prenom: 'Alice', nom: 'Martin' });
    expect(result[1]).toEqual({ id: '2', prenom: 'Bob', nom: 'Durand' });
  });

  it('parseCSV ignore les lignes vides', () => {
    const content = 'id,prenom\n1,Alice\n\n';

    const result = parseCSV(content);

    expect(result).toHaveLength(1);
  });

  it('convertToCSV gère les caractères spéciaux', () => {
    const data = [
      { id: '1', note: 'Excellent, continuez' },
      { id: '2', note: '"Attention" aux détails' },
    ];

    const csv = convertToCSV(data);

    expect(csv).toContain('"Excellent, continuez"');
    expect(csv).toContain('""Attention"" aux détails"');
  });

  it('convertToCSV retourne une chaîne vide pour un tableau vide', () => {
    expect(convertToCSV([])).toBe('');
  });
});
