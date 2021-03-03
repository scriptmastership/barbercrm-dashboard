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
    <li className="relative cursor-pointer text-purple-300 hover:text-white" key={data.path}>
      {match &&
        <span className="absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
      }
      <Link className={clsx('px-6 py-3 inline-flex items-center w-full space-x-4', { 'text-white': match })} to={data.path}>
        <data.Icon className="text-2xl" />
        <span>{data.title}</span>
      </Link>
    </li>
  );
};

export default NavLink;