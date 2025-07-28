import React from 'react';
import ReactDOM from 'react-dom/client';
import GraficoEspacio from './graficoespacio';
import GraficoCrecimiento from './graficocrecimiento'



function Dashboard() {
    return (
        <div className='grid grid-cols-5 grid-rows-6 gap-4 justify-center items-center w-full h-full'>
            <div className='flex flex-col col-span-4 row-span-6 bg-white rounded shadow-lg h-full w-full p-4'>
                <div className='font-bold text-gray-800 text-3xl'>Bienvenido AboGATO tal</div>
                <div className='mt-6'><GraficoCrecimiento /></div>
                <div className='flex items-center justify-center font-semibold'>Crecimiento en los ultimos 3 meses</div>
            </div>
            <div className='flex items-center justify-center row-span-2 col-start-5 bg-white rounded shadow-lg h-full w-full'>
                <div className='flex text-center items-center justify-center'><GraficoEspacio /></div>
            </div>
            <div onClick="" className='flex items-center justify-center row-span-2 col-start-5 row-start-3 hover:bg-blue-200 hover:scale-110 hover:shadow-xl hover:border hover:border-white hover:cursor-pointer bg-white rounded shadow-lg h-full w-full'>
                Ultimo Documento
            </div>
            <div className='flex flex-col items-center justify-center row-span-2 col-start-5 row-start-5 bg-white rounded shadow-lg h-full w-full'>
                <div className='font-semibold text-l'>Documentos Actuales</div>
                <div>
                    <h2 className='text-lg'>25</h2>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
