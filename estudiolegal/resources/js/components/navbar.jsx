import React, { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white flex justify-between items-center w-full h-16 border border-gray-300 shadow-md px-4">
      <div className="flex items-center gap-4">
        <img src="./images/iconolegal.png" alt="Icono Legal" className="max-w-auto h-14 hover:cursor-pointer" />
        <a href="/" className="text-xl font-semibold">Estudio Legal</a>
      </div>

      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen(!dropdownOpen);
          }}
          className="px-4 py-2 text-gray-700 hover:cursor-pointer hover:text-blue-500"
        >
          <img src="./images/pfp.jpg" height="50" width="50" alt="pfp" className="rounded-full" />
        </button>
        

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <a
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              abogato12@gmail.com
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Cerrar sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
