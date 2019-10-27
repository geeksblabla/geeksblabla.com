import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
    className="button outline"
       onClick={onClick}
    >
      {children}
    </button>
  );
}