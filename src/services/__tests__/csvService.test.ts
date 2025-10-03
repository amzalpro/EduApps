import { describe, it, expect } from 'vitest';
import { parseCSV, toCSV } from '../csvService';

describe('csvService', () => {
  describe('parseCSV', () => {
    it('should parse simple CSV content', () => {
      const csv = 'name,age,city\nJohn,30,Paris\nJane,25,London';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', age: '30', city: 'Paris' },
        { name: 'Jane', age: '25', city: 'London' },
      ]);
    });

    it('should handle empty CSV', () => {
      const csv = '';
      const result = parseCSV(csv);
      
      expect(result).toEqual([]);
    });

    it('should handle CSV with only headers', () => {
      const csv = 'name,age,city';
      const result = parseCSV(csv);
      
      expect(result).toEqual([]);
    });

    it('should skip empty lines', () => {
      const csv = 'name,age\nJohn,30\n\nJane,25\n\n';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', age: '30' },
        { name: 'Jane', age: '25' },
      ]);
    });

    it('should handle quoted fields', () => {
      const csv = 'name,description\nJohn,"A person, who works"\nJane,"Another person"';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', description: 'A person, who works' },
        { name: 'Jane', description: 'Another person' },
      ]);
    });

    it('should handle escaped quotes in fields', () => {
      const csv = 'name,quote\nJohn,"""Hello"" world"\nJane,"She said ""Hi"""';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', quote: '"Hello" world' },
        { name: 'Jane', quote: 'She said "Hi"' },
      ]);
    });

    it('should handle missing values', () => {
      const csv = 'name,age,city\nJohn,30,\nJane,,London';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', age: '30', city: '' },
        { name: 'Jane', age: '', city: 'London' },
      ]);
    });

    it('should trim whitespace from values', () => {
      const csv = 'name,age\n  John  ,  30  \n  Jane  ,  25  ';
      const result = parseCSV(csv);
      
      expect(result).toEqual([
        { name: 'John', age: '30' },
        { name: 'Jane', age: '25' },
      ]);
    });
  });

  describe('toCSV', () => {
    it('should convert array of objects to CSV', () => {
      const data = [
        { name: 'John', age: '30', city: 'Paris' },
        { name: 'Jane', age: '25', city: 'London' },
      ];
      const result = toCSV(data);
      
      expect(result).toBe('name,age,city\nJohn,30,Paris\nJane,25,London');
    });

    it('should handle empty array', () => {
      const data: Array<{ [key: string]: string }> = [];
      const result = toCSV(data);
      
      expect(result).toBe('');
    });

    it('should escape fields with commas', () => {
      const data = [
        { name: 'John', description: 'A person, who works' },
      ];
      const result = toCSV(data);
      
      expect(result).toBe('name,description\nJohn,"A person, who works"');
    });

    it('should escape fields with quotes', () => {
      const data = [
        { name: 'John', quote: '"Hello" world' },
      ];
      const result = toCSV(data);
      
      expect(result).toBe('name,quote\nJohn,"""Hello"" world"');
    });

    it('should handle missing values', () => {
      const data = [
        { name: 'John', age: '30', city: '' },
        { name: 'Jane', age: '', city: 'London' },
      ];
      const result = toCSV(data);
      
      expect(result).toBe('name,age,city\nJohn,30,\nJane,,London');
    });

    it('should maintain field order consistently', () => {
      const data = [
        { name: 'John', age: '30', city: 'Paris' },
        { city: 'London', name: 'Jane', age: '25' }, // Different order
      ];
      const result = toCSV(data);
      
      // Should use the order from the first object
      expect(result).toBe('name,age,city\nJohn,30,Paris\nJane,25,London');
    });
  });

  describe('parseCSV and toCSV round-trip', () => {
    it('should maintain data integrity through parse and export', () => {
      const original = [
        { name: 'John', age: '30', city: 'Paris' },
        { name: 'Jane', age: '25', city: 'London' },
      ];
      
      const csv = toCSV(original);
      const parsed = parseCSV(csv);
      
      expect(parsed).toEqual(original);
    });

    it('should handle complex data with special characters', () => {
      const original = [
        { name: 'John "Johnny" Doe', description: 'Works at Company, Inc.', note: 'Likes "quotes"' },
      ];
      
      const csv = toCSV(original);
      const parsed = parseCSV(csv);
      
      expect(parsed).toEqual(original);
    });
  });
});
