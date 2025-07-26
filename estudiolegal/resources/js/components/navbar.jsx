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
    <nav className="bg-white flex justify-between items-center w-full h-15 border border-gray-300 shadow-md">
      <a href="/" className="text-xl">Estudio Legal</a>

      <div className="relative" ref={dropdownRef}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen(!dropdownOpen);
          }}
          className="px-4 py-2 text-gray-700 hover:text-blue-500 cursor-pointer"
        >
          Abogado Tal ▼
        </a>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <a
              href="/perfil"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Perfil
            </a>
            <a
              href="/cerrar-sesion"
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
