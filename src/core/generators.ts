import Card from '../models/card.type';
import { Buffer } from 'node:buffer';

/**
 * Generates a short format deckcode string from an array of cards
 * @param cards - Array of exactly 12 cards to generate deckcode from
 * @returns string - Base64 encoded deckcode string
 */
export function generateDeckcodeString(cards: Card[]): string {
  if (cards.length !== 12)
    throw new Error('A deck must contain exactly 12 cards to generate a deckcode.');
  const shortNames = cards.map((card) => card.shortName);
  const readableDeckcode = shortNames.join(',');
  return Buffer.from(readableDeckcode, 'utf-8').toString('base64');
}

/**
 * Generates a long format deckcode string (JSON) from an array of cards
 * @param cards - Array of cards to generate deckcode from
 * @returns string - Base64 encoded JSON deckcode string
 */
export function generateLongDeckcodeString(cards: Card[]): string {
  const deckObject = {
    Name: 'Generated Deck',
    Cards: cards.map((card) => ({ CardDefId: card.cardDefId })),
  };
  const readableDeckcode = JSON.stringify(deckObject);
  return Buffer.from(readableDeckcode, 'utf-8').toString('base64');
}

/**
 * Generates a human-readable display string for a deck with sorted cards and deckcode
 * @param cards - Array of cards to generate display string from
 * @returns string - Formatted display string with card list and deckcode
 */
export function generateDisplayString(cards: Card[]): string {
  let displayString = '';
  const sorted = cards.sort((a, b) => {
    if (Number(a.cost) === Number(b.cost)) {
      return a.name.localeCompare(b.name);
    } else {
      return Number(a.cost) - Number(b.cost);
    }
  });

  sorted.forEach((card) => {
    displayString += `# (${card.cost}) ${card.name}\n`;
  });
  displayString += '#\n';
  displayString += `${generateDeckcodeString(cards)}\n`;
  displayString += '# Generated with SnapDeck';
  return displayString;
}
