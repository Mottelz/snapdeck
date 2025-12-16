import Card from '../models/card.type';
import cardsData from '../models/cards.json';

interface RawCardData {
  power: string;
  cost: string;
  name: string;
  description: string;
  releaseDate: string;
  cardDefId: string;
  shortName: string;
  obtainable: string | boolean;
}

// Transform the JSON data to match Card interface
const cards: Card[] = (cardsData as RawCardData[]).map((cardData) => ({
  power: cardData.power,
  cost: cardData.cost,
  name: cardData.name,
  description: cardData.description,
  releaseDate: new Date(cardData.releaseDate),
  cardDefId: cardData.cardDefId,
  shortName: cardData.shortName,
  obtainable: cardData.obtainable === '1' || cardData.obtainable === true,
}));

/**
 * Get all cards from the JSON data
 * @returns Card[] Array of all available cards
 */
export function getAllCards(): Card[] {
  return cards;
}

/**
 * Get a single card by its cardDefId
 * @param cardDefId - The unique identifier for the card
 * @returns Card | null The card if found, null otherwise
 */
export function getCardByCardDefId(cardDefId: string): Card | null {
  const card = cards.find((c) => c.cardDefId === cardDefId);
  return card || null;
}

/**
 * Get multiple cards by their cardDefIds
 * @param cardDefIds - Array of unique identifiers for the cards
 * @returns Card[] Array of found cards
 */
export function getCardsByCardDefIds(cardDefIds: string[]): Card[] {
  return cards.filter((card) => cardDefIds.includes(card.cardDefId));
}

/**
 * Get a single card by its shortName
 * @param shortName - The short name identifier for the card
 * @returns Card | null The card if found, null otherwise
 */
export function getCardByShortName(shortName: string): Card | null {
  const card = cards.find((c) => c.shortName === shortName);
  return card || null;
}

/**
 * Get multiple cards by their shortNames
 * @param shortNames - Array of short name identifiers for the cards
 * @returns Card[] Array of found cards
 */
export function getCardsByShortNames(shortNames: string[]): Card[] {
  return cards.filter((card) => shortNames.includes(card.shortName));
}
