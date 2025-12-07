import Deckcode from '../models/deckcode.type';
import Deck from '../models/deck.type';
import Card from '../models/card.type';
import { CardEntity } from '../models/card.entity';
import { Buffer } from 'node:buffer';
import getDataSource from '../helpers/data-source';

/**
 * Extracts a deckcode from input string by decoding base64 content
 * @param input - The input string containing base64 encoded deckcode
 * @returns Deckcode object with type and deckcode, or null if invalid
 */
export function extractDeckcode(input: string): Deckcode | null {
  const rawcode64 = input
    .split('\n')
    .filter(
      (line) =>
        !line.trim().startsWith('#') && !line.trim().includes(' ') && line.trim().length > 0,
    )
    .join('')
    .trim();

  const rawcode = Buffer.from(rawcode64, 'base64').toString('utf-8');

  if (rawcode.includes('{')) {
    return { type: 'long', deckcode: rawcode };
  } else if (rawcode.length > 0) {
    return { type: 'short', deckcode: rawcode };
  }
  return null;
}

/**
 * Parses a deckcode into a complete Deck object with cards
 * @param deckcode - The deckcode object to parse
 * @returns Promise<Deck | null> - Complete deck with 12 cards, or null if invalid
 */
export async function parseDeckcode(deckcode: Deckcode): Promise<Deck | null> {
  const deckToReturn: Deck | null = {
    cards: [],
    deckcode: deckcode,
  };

  if (deckcode.type === 'long') {
    deckToReturn.cards = await parseLongDeckcode(deckcode.deckcode);
  } else if (deckcode.type === 'short') {
    deckToReturn.cards = await parseShortDeckcode(deckcode.deckcode);
  }
  return deckToReturn.cards.length === 12 ? deckToReturn : null;
}

/**
 * Parses a long format deckcode (JSON) into array of cards
 * @param deckcode - The JSON string deckcode to parse
 * @returns Promise<Card[]> - Array of cards from the deckcode
 */
async function parseLongDeckcode(deckcode: string): Promise<Card[]> {
  const dataSource = await getDataSource();
  const parsed: { Name: string; Cards: Array<{ CardDefId: string }> } = JSON.parse(deckcode);
  const cardDefIds: string[] = parsed.Cards.map((card) => card.CardDefId);
  const cards: Card[] = await dataSource
    .getRepository(CardEntity)
    .createQueryBuilder()
    .where(`"cardDefId" IN (:...ids)`, { ids: cardDefIds })
    .getMany();
  return cards;
}

/**
 * Parses a short format deckcode (comma-separated shortNames) into array of cards
 * @param deckcode - The comma-separated shortNames string to parse
 * @returns Promise<Card[]> - Array of cards from the deckcode
 */
async function parseShortDeckcode(deckcode: string): Promise<Card[]> {
  const dataSource = await getDataSource();
  const shortNames = deckcode.split(',');
  const cards: Card[] = await dataSource
    .getRepository(CardEntity)
    .createQueryBuilder()
    .where(`"shortName" IN (:...names)`, { names: shortNames })
    .getMany();
  return cards;
}
