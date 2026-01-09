import Card from './card.type';
import Deckcode from './deckcode.type';

interface Deck {
  cards: Card[];
  deckcode?: Deckcode;
}

export default Deck;
