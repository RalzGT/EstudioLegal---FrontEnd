import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='bg-white w-full h-full p-4'>
      <div className="flex flex-col space-y-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block py-4 rounded-xl px-2 hover:cursor-pointer ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-300 hover:text-white'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/carpetas"
          className={({ isActive }) =>
            `block py-4 rounded-xl px-2 hover:cursor-pointer ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-300 hover:text-white'
            }`
          }
        >
          Ver Carpetas
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
