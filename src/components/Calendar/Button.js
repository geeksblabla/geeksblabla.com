import React from 'react';
import { css } from 'emotion';

 

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