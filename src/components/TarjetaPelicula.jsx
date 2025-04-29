import React from 'react';

const TarjetaPelicula = ({ pelicula, onClick, esFavorita, alternarFavorita }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 m-3 flex flex-col items-center w-64 transition-transform hover:scale-105 border border-gray-200">
      <img
        src={pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/150'}
        alt={pelicula.Title}
        className="w-40 h-60 object-cover rounded-lg shadow-sm"
      />
      <h3 className="text-xl font-bold mt-4 text-center text-slate-800">{pelicula.Title}</h3>
      <p className="text-sm text-gray-600 mb-2">Año: {pelicula.Year}</p>

      <button
        onClick={() => onClick(pelicula)}
        className="text-sm mt-1 bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Ver más
      </button>

      <button
        onClick={() => alternarFavorita(pelicula)}
        className={`mt-3 text-sm px-4 py-2 rounded-full font-medium transition duration-300 ${
          esFavorita
            ? 'bg-green-900 text-white'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {esFavorita ? 'Quitar de Favoritas' : 'Agregar a Favoritas'}
      </button>
    </div>
  );
};

export default TarjetaPelicula;