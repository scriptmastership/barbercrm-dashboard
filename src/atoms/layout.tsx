import { atom } from "recoil";

interface LayoutState {
  init: boolean;
  isMobile: boolean;
}

const layoutAtom = atom({
  key: 'layoutState',
  default: {
    init: false,
    isMobile: false,
  } as LayoutState
});

export default layoutAtom;