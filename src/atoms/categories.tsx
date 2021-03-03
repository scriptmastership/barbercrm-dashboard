import { atom } from "recoil";

export interface Category {
  id: number;
  name: string;
  src: string;
}

interface CategoryState {
  init: boolean;
  categories: Category[];
}

const categoryAtom = atom({
  key: 'categoryState',
  default: {
    init: false,
    categories: []
  } as CategoryState,
});

export default categoryAtom;