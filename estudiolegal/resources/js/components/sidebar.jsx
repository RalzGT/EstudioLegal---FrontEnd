import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='bg-white w-full h-full p-4'>
      <Link to="/" className='block py-4 hover:cursor-pointer hover:bg-blue-400 hover:text-white rounded-xl px-2'>
        Dashboard
      </Link>

      <Link to="/documentos" className='block py-4 hover:cursor-pointer hover:bg-blue-400 hover:text-white rounded-xl px-2'>
        Documentos
      </Link>

      <Link to="/carpetas" className='block py-4 hover:cursor-pointer hover:bg-blue-400 hover:text-white rounded-xl px-2'>
        Carpetas
      </Link>
    </div>
  )
}

export default Sidebar;
