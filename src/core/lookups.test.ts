import {
  getAllCards,
  getCardByIdentifier,
  getCardsByCardDefIds,
  getCardByCardDefId,
  getCardsByShortNames,
  getCardByShortName,
} from './lookups';

describe('Card Lookups', () => {
  describe('getAllCards', () => {
    it('should return all cards from the JSON data', () => {
      // act
      const result = getAllCards();

      // assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Check that cards have expected structure
      const firstCard = result[0];
      expect(firstCard).toHaveProperty('cardDefId');
      expect(firstCard).toHaveProperty('name');
      expect(firstCard).toHaveProperty('power');
      expect(firstCard).toHaveProperty('cost');
      expect(firstCard).toHaveProperty('obtainable');
      expect(firstCard).toHaveProperty('description');
      expect(firstCard).toHaveProperty('releaseDate');
      expect(firstCard).toHaveProperty('shortName');
    });
  });

  describe('getCardByIdentifier', () => {
    it('should find card by cardDefId', () => {
      // act
      const result = getCardByIdentifier('Apocalypse');

      // assert
      expect(result).toBeDefined();
      expect(result?.cardDefId).toBe('Apocalypse');
      expect(result?.name).toBe('Apocalypse');
    });

    it('should find card by shortName when cardDefId fails', () => {
      // act
      const result = getCardByIdentifier('ApclpsA');

      // assert
      expect(result).toBeDefined();
      expect(result?.cardDefId).toBe('Apocalypse');
      expect(result?.shortName).toBe('ApclpsA');
    });

    it('should return null when card is not found by either identifier', () => {
      // act
      const result = getCardByIdentifier('NonExistentCard');

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getCardByCardDefId', () => {
    it('should find card by cardDefId', () => {
      // act
      const result = getCardByCardDefId('Blade');

      // assert
      expect(result).toBeDefined();
      expect(result?.cardDefId).toBe('Blade');
      expect(result?.name).toBe('Blade');
    });

    it('should return null when card is not found', () => {
      // act
      const result = getCardByCardDefId('NonExistentCard');

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getCardByShortName', () => {
    it('should find card by shortName', () => {
      // act
      const result = getCardByShortName('CllnWngB');

      // assert
      expect(result).toBeDefined();
      expect(result?.shortName).toBe('CllnWngB');
      expect(result?.cardDefId).toBe('ColleenWing');
    });

    it('should return null when card is not found', () => {
      // act
      const result = getCardByShortName('NonExistent');

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getCardsByCardDefIds', () => {
    it('should find multiple cards by cardDefIds', () => {
      // act
      const result = getCardsByCardDefIds(['Apocalypse', 'Blade']);

      // assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(result[0].cardDefId).toBe('Apocalypse');
      expect(result[1].cardDefId).toBe('Blade');
    });

    it('should handle empty array input', () => {
      // act
      const result = getCardsByCardDefIds([]);

      // assert
      expect(result).toEqual([]);
    });

    it('should handle non-existent cards', () => {
      // act
      const result = getCardsByCardDefIds(['Apocalypse', 'NonExistent', 'Blade']);

      // assert
      expect(result).toHaveLength(2);
      expect(result.map((c) => c.cardDefId)).toEqual(['Apocalypse', 'Blade']);
    });
  });

  describe('getCardsByShortNames', () => {
    it('should find multiple cards by shortNames', () => {
      // act
      const result = getCardsByShortNames(['ApclpsA', 'CllnWngB']);

      // assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(result[0].shortName).toBe('ApclpsA');
      expect(result[1].shortName).toBe('CllnWngB');
    });

    it('should handle empty array input', () => {
      // act
      const result = getCardsByShortNames([]);

      // assert
      expect(result).toEqual([]);
    });

    it('should handle non-existent cards', () => {
      // act
      const result = getCardsByShortNames(['ApclpsA', 'NonExistent', 'CllnWngB']);

      // assert
      expect(result).toHaveLength(2);
      expect(result.map((c) => c.shortName)).toEqual(['ApclpsA', 'CllnWngB']);
    });
  });
});
