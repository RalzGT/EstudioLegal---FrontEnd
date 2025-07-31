import React, { useState } from 'react';

function Asignar() {
  // Datos aleatorios de ejemplo
  const [array] = useState([
    {
      nombre: "María González",
      fechaNacimiento: "1985-03-15",
      correo: "maria.gonzalez@email.com",
      telefono: "36363535",
      rol: "Abogado",
      fechaCreacion: "2023-01-15"
    },
    {
      nombre: "Carlos Rodríguez",
      fechaNacimiento: "1990-07-22",
      correo: "carlos.rodriguez@email.com",
      telefono: "99989997",
      rol: "Asistente Legal",
      fechaCreacion: "2023-03-10"
    },
    {
      nombre: "Ana Martínez",
      fechaNacimiento: "1988-11-08",
      correo: "ana.martinez@email.com",
      telefono: "32323333",
      rol: "Abogado",
      fechaCreacion: "2023-02-20"
    },
    {
      nombre: "Luis Fernández",
      fechaNacimiento: "1982-05-30",
      correo: "luis.fernandez@email.com",
      telefono: "3333433334",
      rol: "Abogado",
      fechaCreacion: "2023-04-05"
    },
    {
      nombre: "Patricia Silva",
      fechaNacimiento: "1995-09-12",
      correo: "patricia.silva@email.com",
      telefono: "99989998",
      rol: "Asistente Legal",
      fechaCreacion: "2023-05-18"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredArray = array.filter(employee =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-500 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Gestión de Personal</h1>
              <p className="text-gray-100 mt-1">Administra el equipo legal</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <button className='border rounded border-white p-1 hover:bg-white hover:text-blue-500 hover:scale-110 hover:cursor-pointer font-bold'>Registrar Empleado</button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar por nombre..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-40" />
              <col className="w-32" />
              <col className="w-60" />
              <col className="w-28" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
            </colgroup>
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-40">Nombre</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-32">Fecha Nacimiento</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-60">Correo</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-28">Teléfono</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-32">Rol</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-32">Fecha Registro</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredArray.length === 0 ? (
                <tr>
                  <td colSpan="7" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                    {searchTerm ? 'No se encontraron empleados que coincidan con la búsqueda' : 'No hay empleados registrados'}
                  </td>
                </tr>
              ) : (
                filteredArray.map((element, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">
                      <span className={searchTerm && element.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-yellow-200 px-1 rounded' : ''}>
                        {element.nombre}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900 text-center">{element.fechaNacimiento}</td>
                    <td className="border border-gray-300 px-4 py-3 text-blue-600 truncate">{element.correo}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900 text-center">{element.telefono}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex justify-center items-center text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          element.rol.includes('Abogado') ? 'bg-purple-100 text-purple-800' :
                          element.rol.includes('Asistente') ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {element.rol}
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900 text-center">{element.fechaCreacion}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button className="text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline text-sm">
                          ✏️ Editar
                        </button>
                        <button className="text-red-500 hover:cursor-pointer hover:text-red-700 hover:underline text-sm">
                          🗑️ Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>  
    </div>
  );
}

export default Asignar;
