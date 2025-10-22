 
import { Deckcode, Deck, Card } from './types';
import { Buffer } from 'node:buffer'

export function extractDeckcode(input: string): Deckcode | null {
	const rawcode64 = input
	.split('\n')
	.filter(line => !line.trim().startsWith('#') && !line.trim().includes(' ') && line.trim().length > 0)
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

export function parseDeckcode(deckcode: Deckcode): Deck | null {
	const deckToReturn: Deck | null = {
		cards: [],
		name: '',
		deckcode: deckcode
	};

	if (deckcode.type === 'long') {
		deckToReturn.cards =  parseLongDeckcode(deckcode.deckcode);
	} 
	else if (deckcode.type === 'short') {
		deckToReturn.cards = parseShortDeckcode(deckcode.deckcode);
	}
	return deckToReturn;
}


function parseLongDeckcode(deckcode: string): Card[] {
	const parsed: { Name: string, Cards: Array<{ CardDefId: string }> } = JSON.parse(deckcode);
	const cards: Card[] = parsed.Cards.map(card => {return {
		power: 0,
		cost: 0,
		name: '',
		cardDefId: card.CardDefId
	}});
	return cards;
}

function parseShortDeckcode(deckcode: string): Card[] {
	const shortNames = deckcode.split(',');
	const cards: Card[] = shortNames.map(card => {return {
		power: 0,
		name: '',
		shortName: card,
		cost: 0
}})
	return cards;
}