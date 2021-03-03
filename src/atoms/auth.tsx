import { atom } from "recoil";

interface User {
  name: string;
  role: string;
};

interface UserState {
  init: boolean;
  user: User | null;
}

const authAtom = atom({
  key: 'authState',
  default: {
    init: false,
    user: null
  } as UserState
});

export default authAtom;