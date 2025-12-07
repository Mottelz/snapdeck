import Card from '../models/card.type';
import Deck from '../models/deck.type';

type ValidationMode = 'all' | 'none' | 'exact' | 'min' | 'max';

interface ValidationOptions {
  mode: ValidationMode;
  exactCount?: number;
  minCount?: number;
  maxCount?: number;
}

interface ValidationResult {
  isValid: boolean;
  foundCount: number;
  expectedCount: number;
  foundCards: Card[];
  missingCards: Card[];
}

/**
 * Validates whether cards exist in a deck based on specified criteria
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @param options - Validation options specifying the mode and exact count if needed
 * @returns ValidationResult object with detailed information about the validation
 */
export function validateCardsInDeck(
  deck: Deck,
  cardsToCheck: Card[],
  options: ValidationOptions,
): ValidationResult {
  const deckCardIds = new Set(deck.cards.map((card) => card.cardDefId));
  const foundCards = cardsToCheck.filter((card) => deckCardIds.has(card.cardDefId));
  const missingCards = cardsToCheck.filter((card) => !deckCardIds.has(card.cardDefId));
  const foundCount = foundCards.length;

  let isValid = false;
  let expectedCount = 0;

  switch (options.mode) {
    case 'all':
      expectedCount = cardsToCheck.length;
      isValid = foundCount === cardsToCheck.length;
      break;

    case 'none':
      expectedCount = 0;
      isValid = foundCount === 0;
      break;

    case 'exact':
      if (options.exactCount === undefined) {
        throw new Error('exactCount must be provided when mode is "exact"');
      }
      expectedCount = options.exactCount;
      isValid = foundCount === options.exactCount;
      break;

    case 'min':
      if (options.minCount === undefined) {
        throw new Error('minCount must be provided when mode is "min"');
      }
      expectedCount = options.minCount;
      isValid = foundCount >= options.minCount;
      break;

    case 'max':
      if (options.maxCount === undefined) {
        throw new Error('maxCount must be provided when mode is "max"');
      }
      expectedCount = options.maxCount;
      isValid = foundCount <= options.maxCount;
      break;

    default:
      throw new Error('Invalid validation mode');
  }

  return {
    isValid,
    foundCount,
    expectedCount,
    foundCards,
    missingCards,
  };
}

/**
 * Simple boolean validation - checks if all cards exist in the deck
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @returns true if all cards are found in the deck
 */
export function areAllCardsInDeck(deck: Deck, cardsToCheck: Card[]): boolean {
  return validateCardsInDeck(deck, cardsToCheck, { mode: 'all' }).isValid;
}

/**
 * Simple boolean validation - checks if none of the cards exist in the deck
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @returns true if none of the cards are found in the deck
 */
export function areNoCardsInDeck(deck: Deck, cardsToCheck: Card[]): boolean {
  return validateCardsInDeck(deck, cardsToCheck, { mode: 'none' }).isValid;
}

/**
 * Simple boolean validation - checks if exactly the specified number of cards exist in the deck
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @param exactCount - The exact number of cards that should be found
 * @returns true if exactly the specified number of cards are found in the deck
 */
export function areExactCardsInDeck(deck: Deck, cardsToCheck: Card[], exactCount: number): boolean {
  return validateCardsInDeck(deck, cardsToCheck, { mode: 'exact', exactCount }).isValid;
}

/**
 * Simple boolean validation - checks if at least the specified number of cards exist in the deck
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @param minCount - The minimum number of cards that should be found
 * @returns true if at least the specified number of cards are found in the deck
 */
export function areMinCardsInDeck(deck: Deck, cardsToCheck: Card[], minCount: number): boolean {
  return validateCardsInDeck(deck, cardsToCheck, { mode: 'min', minCount }).isValid;
}

/**
 * Simple boolean validation - checks if at most the specified number of cards exist in the deck
 * @param deck - The deck to check
 * @param cardsToCheck - Array of cards to validate
 * @param maxCount - The maximum number of cards that should be found
 * @returns true if at most the specified number of cards are found in the deck
 */
export function areMaxCardsInDeck(deck: Deck, cardsToCheck: Card[], maxCount: number): boolean {
  return validateCardsInDeck(deck, cardsToCheck, { mode: 'max', maxCount }).isValid;
}
