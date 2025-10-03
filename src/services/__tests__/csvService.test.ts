import { describe, it, expect } from 'vitest';
import { parseCSV, parseCSVLine, toCSV, parseStudentList } from '../csvService';

describe('csvService', () => {
  describe('parseCSV', () => {
    it('should parse simple CSV with headers and rows', () => {
      const csv = 'Name,Age,Grade\nAlice,12,6A\nBob,13,6B';
      const result = parseCSV(csv);

      expect(result.headers).toEqual(['Name', 'Age', 'Grade']);
      expect(result.rows).toEqual([
        ['Alice', '12', '6A'],
        ['Bob', '13', '6B']
      ]);
    });

    it('should handle empty CSV', () => {
      const result = parseCSV('');
      expect(result.headers).toEqual([]);
      expect(result.rows).toEqual([]);
    });

    it('should skip empty lines', () => {
      const csv = 'Name,Age\n\nAlice,12\n\nBob,13\n';
      const result = parseCSV(csv);

      expect(result.headers).toEqual(['Name', 'Age']);
      expect(result.rows).toEqual([
        ['Alice', '12'],
        ['Bob', '13']
      ]);
    });

    it('should handle CSV with different delimiter', () => {
      const csv = 'Name;Age;Grade\nAlice;12;6A\nBob;13;6B';
      const result = parseCSV(csv, ';');

      expect(result.headers).toEqual(['Name', 'Age', 'Grade']);
      expect(result.rows).toEqual([
        ['Alice', '12', '6A'],
        ['Bob', '13', '6B']
      ]);
    });
  });

  describe('parseCSVLine', () => {
    it('should parse simple line', () => {
      const result = parseCSVLine('Alice,12,6A');
      expect(result).toEqual(['Alice', '12', '6A']);
    });

    it('should handle quoted fields', () => {
      const result = parseCSVLine('"Smith, John",25,"Grade A"');
      expect(result).toEqual(['Smith, John', '25', 'Grade A']);
    });

    it('should handle escaped quotes', () => {
      const result = parseCSVLine('"He said ""Hello""",test');
      expect(result).toEqual(['He said "Hello"', 'test']);
    });

    it('should trim whitespace', () => {
      const result = parseCSVLine(' Alice , 12 , 6A ');
      expect(result).toEqual(['Alice', '12', '6A']);
    });

    it('should handle empty fields', () => {
      const result = parseCSVLine('Alice,,6A');
      expect(result).toEqual(['Alice', '', '6A']);
    });
  });

  describe('toCSV', () => {
    it('should convert data to CSV string', () => {
      const headers = ['Name', 'Age', 'Grade'];
      const rows = [
        ['Alice', '12', '6A'],
        ['Bob', '13', '6B']
      ];
      const result = toCSV(headers, rows);

      expect(result).toBe('Name,Age,Grade\nAlice,12,6A\nBob,13,6B');
    });

    it('should escape fields with commas', () => {
      const headers = ['Name', 'Description'];
      const rows = [['John', 'Student, grade A']];
      const result = toCSV(headers, rows);

      expect(result).toBe('Name,Description\nJohn,"Student, grade A"');
    });

    it('should escape fields with quotes', () => {
      const headers = ['Name', 'Quote'];
      const rows = [['John', 'He said "Hello"']];
      const result = toCSV(headers, rows);

      expect(result).toBe('Name,Quote\nJohn,"He said ""Hello"""');
    });

    it('should handle custom delimiter', () => {
      const headers = ['Name', 'Age'];
      const rows = [['Alice', '12']];
      const result = toCSV(headers, rows, ';');

      expect(result).toBe('Name;Age\nAlice;12');
    });
  });

  describe('parseStudentList', () => {
    it('should extract student names from CSV', () => {
      const csv = 'Name,Age,Grade\nAlice,12,6A\nBob,13,6B\nCharlie,12,6A';
      const result = parseStudentList(csv);

      expect(result).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should handle empty lines', () => {
      const csv = 'Name,Age\nAlice,12\n\nBob,13';
      const result = parseStudentList(csv);

      expect(result).toEqual(['Alice', 'Bob']);
    });

    it('should return empty array for empty CSV', () => {
      const result = parseStudentList('');
      expect(result).toEqual([]);
    });

    it('should filter out empty names', () => {
      const csv = 'Name\nAlice\n\nBob\n';
      const result = parseStudentList(csv);

      expect(result).toEqual(['Alice', 'Bob']);
    });
  });
});
