import { extractDeckcode, parseDeckcode } from './parsers';
import sampleDeck from '../helpers/sample';
import Deckcode from '../models/deckcode.type';

describe('Deck Parsers', () => {
  describe('extractDeckcode', () => {
    it('should extract a short deckcode from plain text', () => {
      // arrange
      const input = sampleDeck.shortCode.encrypted;

      // act
      const result = extractDeckcode(input);

      // assert
      expect(result).toEqual(sampleDeck.shortCodeObject);
    });

    it('should extract a long deckcode from JSON base64', () => {
      // arrange
      const input = sampleDeck.longCode.encrypted;

      // act
      const result = extractDeckcode(input);

      // assert
      expect(result).toEqual(sampleDeck.longCodeObject);
    });
  });

  describe('parseDeckcode', () => {
    it('should parse a long deckcode into a Deck object', async () => {
      // arrange
      const deckcode = sampleDeck.longCodeObject as Deckcode;

      // act
      const result = await parseDeckcode(deckcode);

      // assert
      expect(result?.deckcode).toEqual(sampleDeck.longCodeObject);
    });

    it('should parse a short deckcode into a Deck object', async () => {
      // arrange
      const deckcode = sampleDeck.shortCodeObject as Deckcode;

      // act
      const result = await parseDeckcode(deckcode);

      // assert
      expect(result?.deckcode).toEqual(sampleDeck.shortCodeObject);
    });
  });
});
