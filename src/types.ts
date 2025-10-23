export interface Card {
	power: number;
	cost: number;
	name: string;
	flavour?: string;
	ability: string;
	releaseDate?: Date;
	cardDefId?: string;
	shortName?: string;
}

export interface Deck {
	cards: Card[];
	name?: string;
	deckcode?: Deckcode;
}

export interface Deckcode {
	deckcode: string;
	type: 'short' | 'long';
}