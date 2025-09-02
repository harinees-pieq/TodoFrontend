import React from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const Input = ({ label, value, onChange, type = 'text' }: Props) => (
  <div className="mb-4">
    <label className="block mb-1 text-gray-700 font-semibold">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-800 text-black"
    />
  </div>
);

export default Input;
