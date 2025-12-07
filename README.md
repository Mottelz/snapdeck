# Snapdeck

A comprehensive TypeScript library for validating, parsing, and generating Marvel Snap deck codes. This library provides utilities to work with Marvel Snap deck data, including card lookups, deck validation, and deckcode generation.

## Installation

```bash
npm install snapdeck
```

## Requirements

- Node.js >= 18
- TypeScript (recommended)

## Features

- 🃏 **Card Lookups**: Search cards by ID, shortName, or batch lookup
- 📋 **Deck Validation**: Validate card presence in decks with flexible criteria
- 🔄 **Deckcode Parsing**: Parse both short and long format deckcodes
- 🏗️ **Deckcode Generation**: Generate deckcodes and display strings
- 🎯 **TypeScript Support**: Full type definitions included
- 💾 **Built-in Database**: SQLite database with Marvel Snap card data

## Quick Start

```typescript
import {
  getAllCards,
  getCardByIdentifier,
  validateCardsInDeck,
  parseDeckcode,
  generateDeckcodeString,
} from 'snapdeck';

// Get all available cards
const allCards = await getAllCards();

// Find a specific card
const apocalypse = await getCardByIdentifier('Apocalypse');
const blade = await getCardByIdentifier('Bld5'); // by shortName

// Parse a deckcode
const deckcode = extractDeckcode(inputString);
const deck = await parseDeckcode(deckcode);

// Validate cards in a deck
const result = validateCardsInDeck(deck, cardsToCheck, { mode: 'all' });
```

## API Reference

### Card Lookups

#### `getAllCards(): Promise<Card[]>`

Retrieves all cards from the database.

```typescript
const cards = await getAllCards();
console.log(`Found ${cards.length} cards`);
```

#### `getCardByIdentifier(identifier: string): Promise<Card | null>`

Finds a card by either cardDefId or shortName (tries cardDefId first).

```typescript
const card = await getCardByIdentifier('Apocalypse');
// or by shortName
const card2 = await getCardByIdentifier('ApclpsA');
```

#### `getCardByCardDefId(cardDefId: string): Promise<Card | null>`

Finds a card specifically by cardDefId.

#### `getCardByShortName(shortName: string): Promise<Card | null>`

Finds a card specifically by shortName.

#### `getCardsByCardDefIds(cardDefIds: string[]): Promise<Card[]>`

Batch lookup for multiple cards by cardDefIds.

#### `getCardsByShortNames(shortNames: string[]): Promise<Card[]>`

Batch lookup for multiple cards by shortNames.

### Deck Validation

#### `validateCardsInDeck(deck: Deck, cardsToCheck: Card[], options: ValidationOptions): ValidationResult`

Validates whether cards exist in a deck based on specified criteria.

**Validation Modes:**

- `'all'` - All cards must be in the deck
- `'none'` - None of the cards should be in the deck
- `'exact'` - Exactly N cards should be in the deck
- `'min'` - At least N cards should be in the deck
- `'max'` - At most N cards should be in the deck

```typescript
// Check if all cards are in deck
const result = validateCardsInDeck(deck, cards, { mode: 'all' });

// Check if exactly 3 cards are in deck
const result2 = validateCardsInDeck(deck, cards, {
  mode: 'exact',
  exactCount: 3,
});

// Check if at least 2 cards are in deck
const result3 = validateCardsInDeck(deck, cards, {
  mode: 'min',
  minCount: 2,
});
```

**ValidationResult:**

```typescript
interface ValidationResult {
  isValid: boolean; // Whether validation passed
  foundCount: number; // Number of cards found
  expectedCount: number; // Expected number based on mode
  foundCards: Card[]; // Array of cards that were found
  missingCards: Card[]; // Array of cards that were missing
}
```

#### Helper Functions

- `areAllCardsInDeck(deck: Deck, cardsToCheck: Card[]): boolean`
- `areNoCardsInDeck(deck: Deck, cardsToCheck: Card[]): boolean`
- `areExactCardsInDeck(deck: Deck, cardsToCheck: Card[], exactCount: number): boolean`
- `areMinCardsInDeck(deck: Deck, cardsToCheck: Card[], minCount: number): boolean`
- `areMaxCardsInDeck(deck: Deck, cardsToCheck: Card[], maxCount: number): boolean`

### Deckcode Parsing

#### `extractDeckcode(input: string): Deckcode | null`

Extracts a deckcode from input string by decoding base64 content.

```typescript
const deckcode = extractDeckcode(inputString);
if (deckcode) {
  console.log(`Found ${deckcode.type} deckcode`);
}
```

#### `parseDeckcode(deckcode: Deckcode): Promise<Deck | null>`

Parses a deckcode into a complete Deck object with cards.

```typescript
const deck = await parseDeckcode(deckcode);
if (deck) {
  console.log(`Deck has ${deck.cards.length} cards`);
}
```

### Deckcode Generation

#### `generateDeckcodeString(cards: Card[]): string`

Generates a short format deckcode string from exactly 12 cards.

```typescript
const deckcode = generateDeckcodeString(cards);
```

#### `generateLongDeckcodeString(cards: Card[]): string`

Generates a long format deckcode string (JSON) from an array of cards.

#### `generateDisplayString(cards: Card[]): string`

Generates a human-readable display string with sorted cards and deckcode.

```typescript
const displayString = generateDisplayString(cards);
console.log(displayString);
// Output:
// # (1) Blade
// # (1) Scorn
// # (2) Colleen Wing
// # ...
// #
// # QmxkNSxTY3JuNSxDbGxuV25nQi...
// # Generated with SnapDeck
```

## Types

### Card

```typescript
interface Card {
  cardDefId: string;
  name: string;
  power: string;
  cost: string;
  obtainable: boolean;
  description: string;
  releaseDate: Date;
  shortName: string;
}
```

### Deck

```typescript
interface Deck {
  cards: Card[];
  deckcode?: Deckcode;
}
```

### Deckcode

```typescript
interface Deckcode {
  type: 'short' | 'long';
  deckcode: string;
}
```

## Examples

### Complete Deck Validation Example

```typescript
import { getAllCards, getCardsByCardDefIds, validateCardsInDeck } from 'snapdeck';

async function validateDeckComposition() {
  // Get some specific cards
  const requiredCards = await getCardsByCardDefIds(['Apocalypse', 'Blade', 'Morbius']);

  // Get a test deck (you would parse this from a deckcode)
  const testDeck = {
    cards: await getCardsByCardDefIds([
      'Apocalypse',
      'Blade',
      'ColleenWing',
      'CorvusGlaive',
      'Dracula',
      'Gambit',
      'Khonshu',
      'LadySif',
      'Modok',
      'Morbius',
      'ProximaMidnight',
      'Scorn',
    ]),
  };

  // Validate that at least 2 of the required cards are in the deck
  const result = validateCardsInDeck(testDeck, requiredCards, {
    mode: 'min',
    minCount: 2,
  });

  if (result.isValid) {
    console.log(`✅ Deck contains ${result.foundCount} required cards`);
    console.log(
      'Found cards:',
      result.foundCards.map((c) => c.name),
    );
  } else {
    console.log(
      `❌ Deck only contains ${result.foundCount} of ${result.expectedCount} required cards`,
    );
    console.log(
      'Missing cards:',
      result.missingCards.map((c) => c.name),
    );
  }
}
```

### Deckcode Processing Example

```typescript
import { extractDeckcode, parseDeckcode, generateDisplayString } from 'snapdeck';

async function processDeckcode(input: string) {
  // Extract deckcode from input
  const deckcode = extractDeckcode(input);
  if (!deckcode) {
    console.error('Invalid deckcode format');
    return;
  }

  // Parse into deck object
  const deck = await parseDeckcode(deckcode);
  if (!deck) {
    console.error('Failed to parse deckcode');
    return;
  }

  // Generate human-readable display
  const displayString = generateDisplayString(deck.cards);
  console.log(displayString);
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/Mottelz/snapdeck](https://github.com/Mottelz/snapdeck)
