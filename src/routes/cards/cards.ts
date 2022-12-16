import { type Writable, writable, derived, readable } from 'svelte/store';
import { CardFilters } from './cardFilters';
import gcgCards from './gcgCards';

//typing of cards will come later - need clean data
const alphaCards = gcgCards.sort((a: any,b: any) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);

export enum ECardTypes {
  CardTypeCharacter = "Character",
  CardTypeAssist = "Support",
  CardTypeEvent = "Event",
  CardTypeModify = "Equipment"
}

// card filter will need to be expanded into an object with keys to allow filtering outside of a single dimension
export const cardFilter: Writable<CardFilters> = writable(CardFilters.All);
export const cards = readable(alphaCards);
export const filteredCards = derived(
  [cards, cardFilter], ([$cards, $cardFilter]) => 
    $cardFilter === CardFilters.All ? $cards : alphaCards.filter((card) => card.card_type == $cardFilter));