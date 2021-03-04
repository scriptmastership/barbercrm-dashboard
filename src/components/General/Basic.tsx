import React from "react";
import { AiOutlineLoading, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { VscListFilter } from 'react-icons/vsc';

export const Button: React.FC<any> = ({ waiting, success, error, children, ...props }) => {
  return (
    <button {...props} disabled={waiting}>
      {success && <AiOutlineCheck />}
      {error && <AiOutlineClose />}
      {waiting && <AiOutlineLoading className="animate-spin" />}
      <span>{children}</span>
    </button>
  )
};

export const Loading: React.FC<any> = () => {
  return (
    <div className="h-64 flex items-center justify-center">
      <AiOutlineLoading className="text-4xl animate-spin inline-block" />
    </div>
  )
};

export const Empty: React.FC<any> = () => {
  return (
    <div className="h-64 flex flex-col items-center justify-center rounded-md space-y-2 bg-white shadow">
      <VscListFilter className="text-3xl text-gray-500" />
      <span className="text-2xl text-black font-semibold">No Data</span>
    </div>
  )
};