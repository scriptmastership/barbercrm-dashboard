import React from "react";
import { AiOutlineLoading } from 'react-icons/ai';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { VscListFilter } from 'react-icons/vsc';
import Select from "react-select";

export const Button: React.FC<any> = ({ waiting, success, error, children, ...props }) => {
  return (
    <button {...props} disabled={waiting}>
      {success && <FaCheck />}
      {error && <FaExclamationTriangle />}
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

const SelectPrimaryStyle = {
  control: (param: any, { isFocused }: any) => ({
    ...param,
    height: '48px',
    backgroundColor: isFocused ? 'white' : '#F3F4F6',
    borderColor: isFocused ? '#6B7280' : '#F3F4F6',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: isFocused ? '#6B7280' : '#F3F4F6'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
}
export const SelectPrimary: React.FC<any> = ({ options, ...props }) => {
  return (
    <Select styles={SelectPrimaryStyle} options={options} {...props} />
  )
};
