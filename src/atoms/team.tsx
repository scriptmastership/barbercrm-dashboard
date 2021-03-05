import { atom } from "recoil";

interface Package {
  id: string;
  name: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  packages: Package[];
};

interface TeamState {
  init: boolean;
  members: Member[];
}

const teamAtom = atom({
  key: 'teamState',
  default: {
    init: false,
    members: []
  } as TeamState
});

export default teamAtom;