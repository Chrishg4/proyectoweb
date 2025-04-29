import React from 'react';
import TarjetaPelicula from './TarjetaPelicula';

const Favoritas = ({ favoritas, enSeleccionarPelicula, alternarFavorita }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl text-slate-800 font-bold mb-6 text-center">
        Películas Favoritas
      </h2>
      {favoritas.length === 0 ? (
        <p className="text-gray-600 text-center">No tienes películas favoritas aún.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {favoritas.map((pelicula) => (
            <TarjetaPelicula
              key={pelicula.imdbID}
              pelicula={pelicula}
              onClick={enSeleccionarPelicula}
              esFavorita={true}
              alternarFavorita={alternarFavorita}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritas;