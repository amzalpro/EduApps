import { describe, it, expect } from 'vitest';
import { LEVEL_COLORS, hexToRgba } from '../colors';

describe('colors utility', () => {
  describe('LEVEL_COLORS', () => {
    it('should contain 20 color values', () => {
      expect(LEVEL_COLORS).toHaveLength(20);
    });

    it('should contain valid hex color codes', () => {
      LEVEL_COLORS.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('should have unique colors', () => {
      const uniqueColors = new Set(LEVEL_COLORS);
      expect(uniqueColors.size).toBe(LEVEL_COLORS.length);
    });

    it('should start with expected colors', () => {
      expect(LEVEL_COLORS[0]).toBe('#ef4444');
      expect(LEVEL_COLORS[1]).toBe('#f97316');
      expect(LEVEL_COLORS[2]).toBe('#eab308');
    });
  });

  describe('hexToRgba', () => {
    it('should convert hex to rgba with full opacity', () => {
      const result = hexToRgba('#ff0000', 1);
      expect(result).toBe('rgba(255, 0, 0, 1)');
    });

    it('should convert hex to rgba with half opacity', () => {
      const result = hexToRgba('#00ff00', 0.5);
      expect(result).toBe('rgba(0, 255, 0, 0.5)');
    });

    it('should convert hex to rgba with zero opacity', () => {
      const result = hexToRgba('#0000ff', 0);
      expect(result).toBe('rgba(0, 0, 255, 0)');
    });

    it('should handle black color', () => {
      const result = hexToRgba('#000000', 1);
      expect(result).toBe('rgba(0, 0, 0, 1)');
    });

    it('should handle white color', () => {
      const result = hexToRgba('#ffffff', 1);
      expect(result).toBe('rgba(255, 255, 255, 1)');
    });

    it('should handle mixed hex values', () => {
      const result = hexToRgba('#ef4444', 0.3);
      expect(result).toBe('rgba(239, 68, 68, 0.3)');
    });

    it('should work with uppercase hex', () => {
      const result = hexToRgba('#FF00FF', 0.8);
      expect(result).toBe('rgba(255, 0, 255, 0.8)');
    });

    it('should handle decimal alpha values', () => {
      const result = hexToRgba('#123456', 0.123);
      expect(result).toBe('rgba(18, 52, 86, 0.123)');
    });
  });
});
