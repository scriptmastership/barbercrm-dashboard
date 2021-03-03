import { atom } from "recoil";

export interface Game {
  id: number;
  name: string;
  description: string;
  helper: string;
  backgrounds_count: number;
  categories_count: number;
}

interface GameState {
  init: boolean;
  games: Game[];
}

const gameAtom = atom({
  key: 'gameState',
  default: {
    init: false,
    games: []
  } as GameState,
});

export default gameAtom;