import React from 'react';

const GraficoCrecimiento = () => {
  // Datos de ejemplo para el espacio
  const espacioUsado = 20;
  const espacioTotal = 100;
  const porcentajeUsado = Math.round((espacioUsado / espacioTotal) * 100);
  
  // Calcular el angulo para el gauge
  const angulo = (porcentajeUsado / 100) * 180;
  
  // Determinar color segun el porcentaje usado
  const getColor = (percentage) => {
    if (percentage < 50) return '#10B981'; // Verde
    if (percentage < 80) return '#F59E0B'; // Amarillo
    return '#EF4444'; // Rojo
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white w-full max-w-screen mx-auto">
      <h3 className="text-xl font-bold text-gray-700 mb-8">Espacio de Almacenamiento</h3>
      
      {/* Gauge semicircular */}
      <div className="relative w-80 h-48 mb-6">
        <svg width="320" height="192" viewBox="0 0 320 192" className="transform">
          {/* Fondo del gauge */}
          <path
            d="M 30 150 A 130 130 0 0 1 290 150"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Progreso del gauge */}
          <path
            d="M 30 150 A 130 130 0 0 1 290 150"
            fill="none"
            stroke={getColor(porcentajeUsado)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(porcentajeUsado / 100) * 408.4} 408.4`}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Indicador/aguja */}
          <g transform={`translate(160, 150) rotate(${angulo - 90})`}>
            <circle cx="0" cy="0" r="6" fill={getColor(porcentajeUsado)} />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-115"
              stroke={getColor(porcentajeUsado)}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </svg>
        
        {/* Texto central */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14">
          <span className="text-5xl font-bold text-gray-800">{porcentajeUsado}%</span>
        </div>
      </div>
      
      {/* Información adicional */}
      <div className="flex justify-between w-full text-lg text-gray-600 mb-4">
        <span>Usado: <span className="font-semibold">{espacioUsado}GB</span></span>
        <span>Total: <span className="font-semibold">{espacioTotal}GB</span></span>
      </div>
      
      {/* Barra de progreso adicional */}
      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: `${porcentajeUsado}%`,
            backgroundColor: getColor(porcentajeUsado)
          }}
        ></div>
      </div>
    </div>
  );
};

export default GraficoCrecimiento;
