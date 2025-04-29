import React, { useState } from 'react';

const BarraBusqueda = ({ enBuscar }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const manejarBusqueda = () => {
    enBuscar(terminoBusqueda);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        placeholder="Buscar película por título..."
        className="w-full sm:w-96 px-4 py-2 text-slate-800 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        onClick={manejarBusqueda}
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

export default BarraBusqueda;