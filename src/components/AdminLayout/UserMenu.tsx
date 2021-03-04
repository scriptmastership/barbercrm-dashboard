import React from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import api from "api";
import authAtom from "atoms/auth";
import { useRecoilValue } from "recoil";
import { IoIosArrowDown } from 'react-icons/io';
import "@szhsin/react-menu/dist/index.css";

const UserMenu: React.FC = () => {

  const authState = useRecoilValue(authAtom);
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const logout = async () => {
    const response = await api.post('auth/logout');
    if (response.status === 200) {
      window.location.href = '/login';
    } else {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <React.Fragment>
      <button
        className="btnOutlineSecondary flex items-center space-x-2"
        ref={ref}
        onClick={() => setOpen(true)}
      >
        <span>{authState.user?.name}</span>
        <IoIosArrowDown />
      </button>
      <ControlledMenu
        align="end"
        offsetY={16}
        anchorRef={ref}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <MenuItem styles={{ padding: 0 }}>
          <div
            className="w-full"
            style={{ padding: '0.375rem 1.5rem' }}
            onClick={logout}
          >
            Logout
          </div>
        </MenuItem>
      </ControlledMenu>
    </React.Fragment>
  );
};

export default UserMenu;