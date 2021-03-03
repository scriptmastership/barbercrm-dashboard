import React from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import api from "api";
import "@szhsin/react-menu/dist/index.css";

const UserMenu: React.FC = () => {

  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const logout = async () => {
    const response = await api.post('api/auth/logout');
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
        className="px-4 h-10 rounded-md flex items-center justify-center focus:outline-none hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
        ref={ref}
        onClick={() => setOpen(true)}
      >
        Admin
    </button>
      <ControlledMenu align="end" anchorRef={ref} isOpen={isOpen} onClose={() => setOpen(false)} >
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