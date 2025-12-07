import {
  validateCardsInDeck,
  areAllCardsInDeck,
  areNoCardsInDeck,
  areExactCardsInDeck,
  areMinCardsInDeck,
  areMaxCardsInDeck,
} from './validators';
import sampleDeck from '../helpers/sample';
import Card from '../models/card.type';
import Deck from '../models/deck.type';

describe('Deck Validators', () => {
  const testDeck: Deck = {
    cards: sampleDeck.cards,
  };

  const cardInDeck = sampleDeck.cards[0]; // Apocalypse
  const anotherCardInDeck = sampleDeck.cards[1]; // Blade
  const thirdCardInDeck = sampleDeck.cards[2]; // Colleen Wing

  const cardNotInDeck: Card = {
    cardDefId: 'IronMan',
    name: 'Iron Man',
    power: '2',
    cost: '5',
    obtainable: true,
    description: 'Ongoing: Your other cards at this location have +2 Power.',
    releaseDate: new Date('2023-01-01T00:00:00.000Z'),
    shortName: 'IrnMn',
  };

  const anotherCardNotInDeck: Card = {
    cardDefId: 'SpiderMan',
    name: 'Spider-Man',
    power: '3',
    cost: '3',
    obtainable: true,
    description: 'On Reveal: Your opponent must discard a card from their hand.',
    releaseDate: new Date('2023-01-01T00:00:00.000Z'),
    shortName: 'SpdrMn',
  };

  describe('validateCardsInDeck', () => {
    it('should validate all cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'all' });

      // assert
      expect(result.isValid).toBe(true);
      expect(result.foundCount).toBe(2);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(2);
      expect(result.missingCards).toHaveLength(0);
      expect(result.foundCards).toContain(cardInDeck);
      expect(result.foundCards).toContain(anotherCardInDeck);
    });

    it('should validate not all cards are in deck when some are missing', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'all' });

      // assert
      expect(result.isValid).toBe(false);
      expect(result.foundCount).toBe(1);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(1);
      expect(result.missingCards).toHaveLength(1);
      expect(result.foundCards[0]).toBe(cardInDeck);
      expect(result.missingCards[0]).toBe(cardNotInDeck);
    });

    it('should validate none of the cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'none' });

      // assert
      expect(result.isValid).toBe(true);
      expect(result.foundCount).toBe(0);
      expect(result.expectedCount).toBe(0);
      expect(result.foundCards).toHaveLength(0);
      expect(result.missingCards).toHaveLength(2);
    });

    it('should validate when some cards are found but none was expected', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'none' });

      // assert
      expect(result.isValid).toBe(false);
      expect(result.foundCount).toBe(1);
      expect(result.expectedCount).toBe(0);
      expect(result.foundCards).toHaveLength(1);
      expect(result.missingCards).toHaveLength(1);
    });

    it('should validate exact number of cards in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, cardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'exact', exactCount: 2 });

      // assert
      expect(result.isValid).toBe(true);
      expect(result.foundCount).toBe(2);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(2);
      expect(result.missingCards).toHaveLength(1);
    });

    it('should validate when exact count does not match', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, thirdCardInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'exact', exactCount: 2 });

      // assert
      expect(result.isValid).toBe(false);
      expect(result.foundCount).toBe(3);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(3);
      expect(result.missingCards).toHaveLength(0);
    });

    it('should validate minimum number of cards in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, cardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'min', minCount: 2 });

      // assert
      expect(result.isValid).toBe(true);
      expect(result.foundCount).toBe(2);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(2);
      expect(result.missingCards).toHaveLength(1);
    });

    it('should validate when minimum count is not met', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'min', minCount: 2 });

      // assert
      expect(result.isValid).toBe(false);
      expect(result.foundCount).toBe(1);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(1);
      expect(result.missingCards).toHaveLength(2);
    });

    it('should validate maximum number of cards in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'max', maxCount: 2 });

      // assert
      expect(result.isValid).toBe(true);
      expect(result.foundCount).toBe(1);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(1);
      expect(result.missingCards).toHaveLength(2);
    });

    it('should validate when maximum count is exceeded', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, thirdCardInDeck];

      // act
      const result = validateCardsInDeck(testDeck, cardsToCheck, { mode: 'max', maxCount: 2 });

      // assert
      expect(result.isValid).toBe(false);
      expect(result.foundCount).toBe(3);
      expect(result.expectedCount).toBe(2);
      expect(result.foundCards).toHaveLength(3);
      expect(result.missingCards).toHaveLength(0);
    });

    it('should throw error when exactCount is missing for exact mode', () => {
      // arrange
      const cardsToCheck = [cardInDeck];

      // act & assert
      expect(() => {
        validateCardsInDeck(testDeck, cardsToCheck, { mode: 'exact' });
      }).toThrow('exactCount must be provided when mode is "exact"');
    });

    it('should throw error when minCount is missing for min mode', () => {
      // arrange
      const cardsToCheck = [cardInDeck];

      // act & assert
      expect(() => {
        validateCardsInDeck(testDeck, cardsToCheck, { mode: 'min' });
      }).toThrow('minCount must be provided when mode is "min"');
    });

    it('should throw error when maxCount is missing for max mode', () => {
      // arrange
      const cardsToCheck = [cardInDeck];

      // act & assert
      expect(() => {
        validateCardsInDeck(testDeck, cardsToCheck, { mode: 'max' });
      }).toThrow('maxCount must be provided when mode is "max"');
    });

    it('should throw error for invalid validation mode', () => {
      // arrange
      const cardsToCheck = [cardInDeck];

      // act & assert
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validateCardsInDeck(testDeck, cardsToCheck, { mode: 'invalid' as any });
      }).toThrow('Invalid validation mode');
    });
  });

  describe('areAllCardsInDeck', () => {
    it('should return true when all cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck];

      // act
      const result = areAllCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(true);
    });

    it('should return false when not all cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck];

      // act
      const result = areAllCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(false);
    });

    it('should return true for empty array', () => {
      // arrange
      const cardsToCheck: Card[] = [];

      // act
      const result = areAllCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(true);
    });
  });

  describe('areNoCardsInDeck', () => {
    it('should return true when no cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = areNoCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(true);
    });

    it('should return false when some cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck];

      // act
      const result = areNoCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(false);
    });

    it('should return true for empty array', () => {
      // arrange
      const cardsToCheck: Card[] = [];

      // act
      const result = areNoCardsInDeck(testDeck, cardsToCheck);

      // assert
      expect(result).toBe(true);
    });
  });

  describe('areExactCardsInDeck', () => {
    it('should return true when exact number of cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, cardNotInDeck];

      // act
      const result = areExactCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(true);
    });

    it('should return false when exact number does not match', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, thirdCardInDeck];

      // act
      const result = areExactCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(false);
    });
  });

  describe('areMinCardsInDeck', () => {
    it('should return true when at least minimum cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, cardNotInDeck];

      // act
      const result = areMinCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(true);
    });

    it('should return true when more than minimum cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, thirdCardInDeck];

      // act
      const result = areMinCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(true);
    });

    it('should return false when minimum is not met', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = areMinCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(false);
    });
  });

  describe('areMaxCardsInDeck', () => {
    it('should return true when at most maximum cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, cardNotInDeck];

      // act
      const result = areMaxCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(true);
    });

    it('should return true when fewer than maximum cards are in deck', () => {
      // arrange
      const cardsToCheck = [cardInDeck, cardNotInDeck, anotherCardNotInDeck];

      // act
      const result = areMaxCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(true);
    });

    it('should return false when maximum is exceeded', () => {
      // arrange
      const cardsToCheck = [cardInDeck, anotherCardInDeck, thirdCardInDeck];

      // act
      const result = areMaxCardsInDeck(testDeck, cardsToCheck, 2);

      // assert
      expect(result).toBe(false);
    });
  });
});
