import React from "react";
import { AiOutlineLoading } from 'react-icons/ai';

export const Button: React.FC<any> = ({ waiting, children, ...props }) => {
  return (
    <button {...props} disabled={waiting}>
      {waiting ? <AiOutlineLoading className="animate-spin inline-block" /> : children}
    </button>
  )
};