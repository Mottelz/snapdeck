import {
  generateDeckcodeString,
  generateDisplayString,
  generateLongDeckcodeString,
} from './generators';
import Card from '../models/card.type';
import sampleDeck from '../helpers/sample';
import { Buffer } from 'node:buffer';

describe('Generators', () => {
  describe('generateDeckcode', () => {
    it('should generate correct short deckcode from cards', async () => {
      // arrange
      const cards: Card[] = sampleDeck.cards;

      // act
      const result = await generateDeckcodeString(cards);

      // assert
      expect(result).toEqual(sampleDeck.shortCode.encrypted);
    });
  });

  describe('generateLongDeckcode', () => {
    it('should generate correct long deckcode from cards', async () => {
      // arrange
      const cards: Card[] = sampleDeck.cards;

      // act
      const result = await generateLongDeckcodeString(cards);

      const decode = (b64: string) => JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));

      // assert
      expect(decode(result).Cards).toEqual(decode(sampleDeck.longCode.encrypted).Cards);
    });
  });

  describe('generateDisplayDeck', () => {
    it('should generate correct display string from cards', async () => {
      // arrange
      const cards: Card[] = sampleDeck.cards;

      // act
      const result = await generateDisplayString(cards);

      // assert
      expect(result).toEqual(sampleDeck.displayString);
    });
  });
});
