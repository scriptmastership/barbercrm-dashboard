import { atom } from "recoil";

export enum ServiceTarget {
  ALL = 'ALL',
  MEN = 'MEN',
  WOMEN = 'WOMEN'
}

export enum ServiceType {
  MIXED = 'MIXED',
  SINGLE = 'SINGLE'
}

export interface Category {
  id: string;
  name: string;
  description: string;
};

export interface Package {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  target: ServiceTarget;
  type: ServiceType;
  time: number;
  price: number;
};

interface ServeState {
  init: boolean;
  categories: Category[];
  packages: Package[];
}

const serviceAtom = atom({
  key: 'serviceState',
  default: {
    init: false,
    categories: [],
    packages: []
  } as ServeState
});

export default serviceAtom;