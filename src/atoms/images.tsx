import { atom } from "recoil";
import { Category } from "./categories";

export interface Image {
  id: number;
  name: string;
  src: string;
  category_id: number;
  category: Category;
}

interface ImageState {
  init: boolean;
  images: Image[];
}

const imageAtom = atom({
  key: 'imageState',
  default: {
    init: false,
    images: []
  } as ImageState,
});

export default imageAtom;