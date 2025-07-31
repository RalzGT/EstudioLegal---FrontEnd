import React from 'react';

const GraficoEspacio = () => {
  const espacioUtilizado = 150; // MB
  const espacioTotal = 500; // MB

  const porcentaje = (espacioUtilizado / espacioTotal) * 100;

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-semibold">Espacio Utilizado</h2>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {`${porcentaje.toFixed(1)}% (${espacioUtilizado} MB de ${espacioTotal} MB)`}
      </p>
    </div>
  );
};

export default GraficoEspacio;
