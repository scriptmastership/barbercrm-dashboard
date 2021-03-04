import React from "react";
import { Link } from "react-router-dom";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

const AddMenu: React.FC = () => {

  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  return (
    <React.Fragment>
      <button className="btnPrimary" ref={ref} onClick={() => setOpen(true)}>
        Add
      </button>
      <ControlledMenu
        align="start"
        offsetY={8}
        anchorRef={ref}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className="divide-y"
      >
        <MenuItem styles={{ padding: 0 }}>
          <Link className="w-full py-2 px-4" to="/admin/service/category">
            New Category
          </Link>
        </MenuItem>
        <MenuItem styles={{ padding: 0 }}>
          <Link className="w-full py-2 px-4" to="/admin/service/package">
            New Package
          </Link>
        </MenuItem>
      </ControlledMenu>
    </React.Fragment>
  );
};

export default AddMenu;