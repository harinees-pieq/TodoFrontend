import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      style={{ cursor: 'pointer' }}
      className={`w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
