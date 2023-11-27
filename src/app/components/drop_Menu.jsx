"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const DropdownMenu = ({ items, nombre }) => {
 const [open, setOpen] = useState(false);

 const handleClick = () => {
    setOpen(!open);
 };

 const handleClose = () => {
    setOpen(false);
 };

 const handleWindowClick = (event) => {
    if (open && event.target.closest('.dropdown') === null) {
      handleClose();
    }
 };

 const handleOptionClick = () => {
  // Aquí puedes agregar cualquier acción adicional que desees realizar cuando se haga clic en una opción.
  setOpen(!open);
};

 React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
 }, [open]);


 return (
    <div  className= "relative dropdown">
      <button className= "text-gray-300 hover:text-white rounded-md text-lg" onClick={handleClick}>
        {nombre}
      </button>
      {open && (
        <div className="absolute z-10 top-full left-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item, index) => (
            <Link className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' key={index} href={item.link} onClick={handleOptionClick}>
              {item.name}
            </Link>
      ))}
        </div>
      )}
    </div>
 );
};

export default DropdownMenu;