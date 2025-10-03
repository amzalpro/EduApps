/**
 * CSV parsing service
 * Provides utilities for parsing CSV data into structured format
 */

export interface CSVParseResult {
  headers: string[];
  rows: string[][];
}

/**
 * Parse CSV string into headers and rows
 * @param csvString - Raw CSV string
 * @param delimiter - Field delimiter (default: ',')
 * @returns Parsed CSV data with headers and rows
 */
export function parseCSV(csvString: string, delimiter: string = ','): CSVParseResult {
  const lines = csvString.trim().split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = parseCSVLine(lines[0], delimiter);
  const rows = lines.slice(1).map(line => parseCSVLine(line, delimiter));

  return { headers, rows };
}

/**
 * Parse a single CSV line, handling quoted fields
 * @param line - CSV line to parse
 * @param delimiter - Field delimiter
 * @returns Array of field values
 */
export function parseCSVLine(line: string, delimiter: string = ','): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());

  return result;
}

/**
 * Convert array data to CSV string
 * @param headers - Column headers
 * @param rows - Data rows
 * @param delimiter - Field delimiter (default: ',')
 * @returns CSV string
 */
export function toCSV(headers: string[], rows: string[][], delimiter: string = ','): string {
  const escapeLine = (values: string[]) => {
    return values.map(value => {
      // Escape quotes and wrap in quotes if contains delimiter, quotes, or newlines
      if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(delimiter);
  };

  const csvLines = [
    escapeLine(headers),
    ...rows.map(row => escapeLine(row))
  ];

  return csvLines.join('\n');
}

/**
 * Parse student list from CSV
 * @param csvString - CSV string with student data
 * @returns Array of student names
 */
export function parseStudentList(csvString: string): string[] {
  const { rows } = parseCSV(csvString);
  return rows.map(row => row[0]).filter(name => name && name.trim() !== '');
}
