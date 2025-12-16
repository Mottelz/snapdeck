import Card from '../models/card.type';
import {
  getAllCards as getAllCardsFromJson,
  getCardByCardDefId as getCardByCardDefIdFromJson,
  getCardsByCardDefIds as getCardsByCardDefIdsFromJson,
  getCardByShortName as getCardByShortNameFromJson,
  getCardsByShortNames as getCardsByShortNamesFromJson,
} from '../helpers/json-data-service';

/**
 * Get all cards from the JSON data
 * @returns Card[] - Array of all cards
 */
export function getAllCards(): Card[] {
  return getAllCardsFromJson();
}

/**
 * Get a specific card by cardDefId or shortName
 * @param identifier - The cardDefId or shortName to search for
 * @returns Card | null - The found card or null if not found
 */
export function getCardByIdentifier(identifier: string): Card | null {
  // Try to find by cardDefId first, then by shortName
  let card = getCardByCardDefIdFromJson(identifier);

  if (!card) {
    card = getCardByShortNameFromJson(identifier);
  }

  return card;
}

/**
 * Get multiple cards by cardDefIds
 * @param cardDefIds - Array of cardDefIds to search for
 * @returns Card[] - Array of found cards
 */
export function getCardsByCardDefIds(cardDefIds: string[]): Card[] {
  return getCardsByCardDefIdsFromJson(cardDefIds);
}

/**
 * Get a specific card by cardDefId
 * @param cardDefId - The cardDefId to search for
 * @returns Card | null - The found card or null if not found
 */
export function getCardByCardDefId(cardDefId: string): Card | null {
  return getCardByCardDefIdFromJson(cardDefId);
}

/**
 * Get multiple cards by shortNames
 * @param shortNames - Array of shortNames to search for
 * @returns Card[] - Array of found cards
 */
export function getCardsByShortNames(shortNames: string[]): Card[] {
  return getCardsByShortNamesFromJson(shortNames);
}

/**
 * Get a specific card by shortName
 * @param shortName - The shortName to search for
 * @returns Card | null - The found card or null if not found
 */
export function getCardByShortName(shortName: string): Card | null {
  return getCardByShortNameFromJson(shortName);
}
