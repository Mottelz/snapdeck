import { parseRawStringToDeck, getDeckCode } from './deck-utils';
import sampleDeck from '../helpers/sample';
import Deck from '../models/deck.type';

describe('Deck Utils', () => {
  describe('parseRawStringToDeck', () => {
    it('should parse a raw string with short deckcode into a Deck object', async () => {
      // arrange
      const rawString = sampleDeck.shortCode.encrypted;

      // act
      const result = await parseRawStringToDeck(rawString);

      // assert
      expect(result?.deckcode).toEqual(sampleDeck.shortCodeObject);
      expect(result?.cards).toBeDefined();
    });

    it('should parse a raw string with long deckcode into a Deck object', async () => {
      // arrange
      const rawString = sampleDeck.longCode.encrypted;

      // act
      const result = await parseRawStringToDeck(rawString);

      // assert
      expect(result?.deckcode).toEqual(sampleDeck.longCodeObject);
      expect(result?.cards).toBeDefined();
    });

    it('should return null for invalid raw string', async () => {
      // arrange
      const rawString = 'invalid string with no deckcode';

      // act
      const result = await parseRawStringToDeck(rawString);

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getDeckCode', () => {
    it('should generate a deck code for a valid deck', () => {
      // arrange
      const deck = { cards: sampleDeck.cards };

      // act
      const result = getDeckCode(deck);

      // assert
      expect(result).toBe(sampleDeck.shortCode.encrypted);
      expect(typeof result).toBe('string');
    });

    it('should return null for deck with no cards', () => {
      // arrange
      const deck = { cards: [] };

      // act
      const result = getDeckCode(deck);

      // assert
      expect(result).toBeNull();
    });

    it('should return null for deck with wrong number of cards', () => {
      // arrange
      const deck = { cards: sampleDeck.cards.slice(0, 5) }; // Only 5 cards instead of 12

      // act
      const result = getDeckCode(deck);

      // assert
      expect(result).toBeNull();
    });

    it('should return null for deck with invalid cards', () => {
      // arrange
      const invalidCards = [
        ...sampleDeck.cards.slice(0, 11),
        { ...sampleDeck.cards[11], cardDefId: '' }, // Invalid cardDefId
      ];
      const deck = { cards: invalidCards };

      // act
      const result = getDeckCode(deck);

      // assert
      expect(result).toBeNull();
    });

    it('should return null for null deck', () => {
      // act
      const result = getDeckCode(null!);

      // assert
      expect(result).toBeNull();
    });

    it('should return null for deck without cards property', () => {
      // arrange
      const deck = {} as Deck;

      // act
      const result = getDeckCode(deck);

      // assert
      expect(result).toBeNull();
    });
  });
});
