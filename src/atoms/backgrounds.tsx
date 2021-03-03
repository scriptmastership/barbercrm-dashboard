import { atom } from "recoil";

export interface Background {
  id: number;
  name: string;
  src: string;
}

interface BackgroundState {
  init: boolean;
  backgrounds: Background[];
}

const backgroundAtom = atom({
  key: 'backgroundState',
  default: {
    init: false,
    backgrounds: []
  } as BackgroundState,
});

export default backgroundAtom;