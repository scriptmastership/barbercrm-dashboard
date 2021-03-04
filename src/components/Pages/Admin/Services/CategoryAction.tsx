import React from "react";
import { Link } from "react-router-dom";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLoading } from 'react-icons/ai';
import serviceAtom from "atoms/service";
import { useRecoilState } from "recoil";
import api from "api";
import clsx from "clsx";
import "@szhsin/react-menu/dist/index.css";

const CategoryAction: React.FC<any> = ({ categoryId }) => {

  const [serviceState, setServiceState] = useRecoilState(serviceAtom);
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [status, setStatus] = React.useState('');

  const handleDelete = async () => {

    setStatus('remove');

    const response = await api.post('/service/category_remove', {
      id: categoryId
    });

    if (response.status === 200) {
      setStatus('success');
      setServiceState({
        ...serviceState,
        categories: serviceState.categories.filter(category => category.id !== categoryId)
      });
    } else {
      setStatus('error');
    }
  };

  return (
    <React.Fragment>
      <button
        className="btnOutlineCircle"
        ref={ref}
        onClick={() => setOpen(true)}
        disabled={status === 'remove'}
      >
        {status === 'remove' ? <AiOutlineLoading className="animate-spin" /> : <BsThreeDots />}
      </button>
      <ControlledMenu
        align="end"
        offsetY={4}
        anchorRef={ref}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className="divide-y shadow p-0 text-sm"
      >
        <MenuItem styles={{ padding: 0 }}>
          <Link className="w-full py-2 px-4" to={`/admin/service/category/${categoryId}`}>
            Edit Category
          </Link>
        </MenuItem>
        <MenuItem styles={{ padding: 0 }}>
          <div className={clsx('w-full py-2 px-4', status === 'error' && 'text-danger')} onClick={handleDelete}>
            Remove Category
          </div>
        </MenuItem>
      </ControlledMenu>
    </React.Fragment>
  );
};

export default CategoryAction;