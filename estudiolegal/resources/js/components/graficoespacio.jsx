import React from 'react';

const GraficoEspacio = () => {
  const espacioUtilizado = 150;
  const espacioTotal = 500; 

  const porcentaje = (espacioUtilizado / espacioTotal) * 100;

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-semibold">Espacio Utilizado</h2>
      <meter
        value={espacioUtilizado}
        min="0"
        max={espacioTotal}
        className="w-full h-6"
      ></meter>
      <p className="mt-2 text-sm text-gray-600">{`${Math.round((porcentaje.toFixed(1)/1024)*100)}% (${espacioUtilizado} MB de ${espacioTotal} GB)`}</p>
    </div>
  );
};

export default GraficoEspacio;
