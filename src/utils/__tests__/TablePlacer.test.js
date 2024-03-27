import { render, screen } from '@testing-library/react';
import { combineClusters, findClusters } from "../TablePlacer";

describe('combineClusters', () => {
    it('should leave non-overlapping clusters untouched', () => {
      const clusters = [[1, 2], [3, 4]];
      const expected = [[1, 2], [3, 4]];
      console.log(combineClusters(clusters));
      expect(combineClusters(clusters)).toEqual(expected);
    });
  
    it('should merge overlapping clusters', () => {
      const clusters = [[1, 2], [2, 3]];
      const expected = [[1, 2, 3]];
      expect(combineClusters(clusters)).toEqual(expected);
    });
  
    it('should handle fully contained clusters', () => {
      const clusters = [[1, 2, 3], [2, 3]];
      const expected = [[1, 2, 3]];
      expect(combineClusters(clusters)).toEqual(expected);
    });
  
    it('should correctly combine multiple overlapping clusters', () => {
      const clusters = [[1, 2], [3, 4], [2, 3]];
      const expected = [[1, 2, 3, 4]];
      expect(combineClusters(clusters)).toEqual(expected);
    });
  
    it('should process complex cluster combinations accurately', () => {
      const clusters = [[1, 2], [3, 4], [5, 6], [2, 3], [4, 5]];
      const expected = [[1, 2, 3, 4, 5, 6]];
      expect(combineClusters(clusters)).toEqual(expected);
    });
  });

describe('findClusters', () => {
    it('should return the correct clusters', () => {
        const rectangles = [
            { x: 0, y: 0, width: 10, height: 10 },
            { x: 20, y: 20, width: 10, height: 10 },
            { x: 10, y: 10, width: 10, height: 10 },
        ];
        const rectangles_lookup = rectangles.map((rect, i) => ({ ...rect, id: i }));
        const clusters = findClusters(rectangles, [], rectangles_lookup);
        expect(clusters).toEqual([[0, 2], [1]]);
    });
});