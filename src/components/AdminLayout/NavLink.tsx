import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import clsx from "clsx";

interface Props {
  data: any;
}

const NavLink: React.FC<Props> = ({ data }) => {

  const match = useRouteMatch({
    path: data.path,
    exact: true
  });

  return (
    <li className={clsx('cursor-pointer bg-opacity-20 rounded-md group', match ? 'bg-secondary' : 'bg-transparent', !match && 'hover:bg-grey4')} key={data.path}>
      <Link className={clsx('px-6 py-4 inline-flex items-center w-full space-x-4')} to={data.path}>
        <data.Icon className={clsx('text-2xl', match ? 'text-primary' : 'text-grey2')} />
        <span className={match ? 'text-primary' : 'text-grey1'}>
          {data.title}
        </span>
      </Link>
    </li>
  );
};

export default NavLink;