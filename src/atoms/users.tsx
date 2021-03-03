import { atom } from "recoil";
import { Tenant } from "./tenants";

interface User {
  id: number;
  name: string;
  nickname: string;
  role: string;
  tenant_id: string;
  tenant: Tenant;
}

interface UserState {
  init: boolean;
  users: User[];
}

const userAtom = atom({
  key: 'userState',
  default: {
    init: false,
    users: []
  } as UserState,
});

export default userAtom;