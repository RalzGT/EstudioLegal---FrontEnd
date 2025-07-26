import React from 'react';
import ReactDOM from 'react-dom/client';

function Dashboard() {
    return (
        <div className='grid grid-cols-5 grid-rows-6 gap-4 justify-center items-center w-full h-full'>
            <div className='flex items-center justify-center col-span-4 row-span-6 bg-white rounded shadow-lg h-full w-full'>
                ChartJS para espacio disponible
            </div>
            <div className='flex items-center justify-center row-span-2 col-start-5 bg-white rounded shadow-lg h-full w-full'>
                Documentos Actuales en Nube
            </div>
            <div className='flex items-center justify-center row-span-2 col-start-5 row-start-3 bg-white rounded shadow-lg h-full w-full'>
                Ultimo Documento
            </div>
            <div className='flex items-center justify-center row-span-2 col-start-5 row-start-5 bg-white rounded shadow-lg h-full w-full'>
                Crecimiento de Documentos
            </div>
        </div>
    )
}

export default Dashboard
