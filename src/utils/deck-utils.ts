import { extractDeckcode, parseDeckcode } from '../core/parsers';
import { generateDeckcodeString } from '../core/generators';
import Deck from '../models/deck.type';

/**
 * Extracts a deckcode from a raw string and converts it to a complete Deck object
 * @param rawString - The raw input string containing a base64 encoded deckcode
 * @returns Promise<Deck | null> - Complete deck with 12 cards, or null if invalid/not found
 */
export async function parseRawStringToDeck(rawString: string): Promise<Deck | null> {
  // Extract the deckcode from the raw string
  const deckcode = extractDeckcode(rawString);

  if (!deckcode) {
    return null;
  }

  // Convert the deckcode to a complete deck object
  return await parseDeckcode(deckcode);
}

/**
 * Generates a short code from a deck
 * @param deck - The deck object containing cards
 * @returns string | null - Base64 encoded deckcode string, or null if invalid deck
 */
export function getDeckCode(deck: Deck): string | null {
  // Validate deck has exactly 12 cards
  if (!deck || !deck.cards || deck.cards.length !== 12) {
    return null;
  }

  // Validate all cards exist (have required properties)
  const hasValidCards = deck.cards.every(
    (card) => card && typeof card.cardDefId === 'string' && card.cardDefId.length > 0,
  );

  if (!hasValidCards) {
    return null;
  }

  try {
    // Generate short format deckcode
    return generateDeckcodeString(deck.cards);
  } catch {
    // Return null if generation fails for any reason
    return null;
  }
}
