/**
 * CSV Service for parsing and handling CSV data
 */

export interface CsvRow {
  [key: string]: string;
}

/**
 * Parse CSV content into an array of objects
 * @param csvContent - Raw CSV string content
 * @returns Array of objects representing CSV rows
 */
export function parseCSV(csvContent: string): CsvRow[] {
  const lines = csvContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  // First line is the header
  const headers = parseCsvLine(lines[0]);
  const rows: CsvRow[] = [];

  // Parse remaining lines
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    
    // Skip empty rows
    if (values.length === 0 || values.every(v => v === '')) {
      continue;
    }

    const row: CsvRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Parse a single CSV line, handling quoted fields and escaped quotes
 * @param line - A single line from CSV
 * @returns Array of field values
 */
function parseCsvLine(line: string): string[] {
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
    } else if (char === ',' && !inQuotes) {
      // Field separator
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
 * Convert array of objects to CSV string
 * @param data - Array of objects to convert
 * @returns CSV string representation
 */
export function toCSV(data: CsvRow[]): string {
  if (data.length === 0) {
    return '';
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create header row
  const headerRow = headers.map(escapeField).join(',');
  
  // Create data rows
  const dataRows = data.map(row => 
    headers.map(header => escapeField(row[header] || '')).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Escape a CSV field value
 * @param field - Field value to escape
 * @returns Escaped field value
 */
function escapeField(field: string): string {
  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
