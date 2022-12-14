import { type Writable, writable, derived, readable } from 'svelte/store';
import { CardFilters } from './cardFilters';
import gcgCards from './gcgCards';

export const cardFilter: Writable<CardFilters> = writable(CardFilters.All);
export const cards = readable(gcgCards);
export const filteredCards = derived(
  [cards, cardFilter], ([$cards, $cardFilter]) => 
    $cardFilter === CardFilters.All ? $cards : gcgCards.filter((card) => card.card_type == $cardFilter));