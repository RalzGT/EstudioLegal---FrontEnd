import React from 'react';

function Asignar() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white overflow-hidden">
      <div className="bg-white rounded-lg p-8 w-[350px] shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Asignación de roles</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="text"
              id="correo"
              name="correo"
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              id="rol"
              name="rol"
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="abogado">Abogado</option>
              <option value="asistente">Asistente</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Asignar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Asignar;
