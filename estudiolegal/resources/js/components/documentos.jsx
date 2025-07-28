import React from 'react';
import ReactDOM from 'react-dom/client';


function Documentos() {
  return (
    <div className='flex flex-col justify-center items-center bg-white w-full h-full rounded-md'>
      <div>
        <div className='flex justify-center items-start mt-5'>
          <h1 className=' text-3xl'>Suba sus archivos aquí.</h1>
        </div>
        <div className='flex justify-center items-center md:w-200 md:h-90 bg-gray-300 border border-gray-200 shadow-md mt-5'>
          Arrastre el archivo
        </div>
      </div>
    </div>
  )
}

export default Documentos
