import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraficoEspacio from './graficoespacio';
import GraficoCrecimiento from './graficocrecimiento'
import Modal from './modal';

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='grid grid-cols-5 grid-rows-6 gap-4 justify-center items-center w-full h-full'>
            <div className='flex flex-col col-span-4 row-span-6 bg-white rounded shadow-lg h-full w-full p-4'>
                <div className='font-bold text-gray-800 text-3xl'>Bienvenido Abogado</div>
                <div className='mt-6'><GraficoCrecimiento /></div>
            </div>
            <div className='flex flex-col items-center justify-center row-span-2 col-start-5 row-start-1 bg-white rounded shadow-lg h-full w-full'>
                <div className='font-semibold text-l'>Documentos Actuales</div>
                <div>
                    <h2 className='text-lg'>25</h2>
                </div>
            </div>
            <>
                <div
                    onClick={() => setModalOpen(true)}
                    className='flex items-center justify-center row-span-2 col-start-5 row-start-3 hover:bg-blue-200 hover:scale-110 hover:shadow-xl hover:border hover:border-white hover:cursor-pointer bg-white rounded shadow-lg h-full w-full'
                >
                    Ultimos Movimientos
                </div>

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">Movimientos en archivos</h2>
                    <p className="mb-4">Contenido del documento o lo que quieras mostrar.</p>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-600"
                    >
                        Cerrar
                    </button>
                </Modal>
            </>
            <div className='flex flex-col items-center justify-center text-center row-span-2 col-start-5 row-start-5 bg-white rounded shadow-lg h-full w-full'>
                <div className='font-semibold text-l'>Espacio para Opcion o Contenido</div>
                <span>O simplemente se borra.</span>
            </div>
        </div>
    )
}

export default Dashboard
