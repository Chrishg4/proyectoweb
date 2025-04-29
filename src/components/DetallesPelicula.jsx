import React, { useEffect, useState } from 'react';

const DetallesPelicula = ({ pelicula, enVolver }) => {
  const [detalles, setDetalles] = useState(null);
  const CLAVE_API = 'a2b30413';
  const URL_API = `http://www.omdbapi.com/?apikey=${CLAVE_API}&i=${pelicula.imdbID}`;

  useEffect(() => {
    const obtenerDetalles = async () => {
      try {
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();
        setDetalles(datos);
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };
    obtenerDetalles();
  }, [URL_API]);

  if (!detalles) return <div className="text-center text-slate-700">Cargando...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
      
      <div className="flex flex-col sm:flex-row items-start">
        <img
          src={detalles.Poster !== 'N/A' ? detalles.Poster : 'https://via.placeholder.com/150'}
          alt={detalles.Title}
          className="w-52 h-80 object-cover rounded-lg mb-6 sm:mb-0 sm:mr-8 shadow-lg border"
        />
        <div className="text-slate-800">
          <h2 className="text-3xl font-bold mb-2">{detalles.Title}</h2>
          <p className="text-gray-600 font-medium mb-2">Año: {detalles.Year}</p>
          <p className="mb-4 leading-relaxed">{detalles.Plot}</p>
          <p className="mb-2">
            <span className="font-semibold">Calificación:</span> {detalles.imdbRating}/10
          </p>
          <p>
            <span className="font-semibold">Director:</span> {detalles.Director}
          </p>
          <br />
          <button
        onClick={enVolver}
        className="mb-6 px-5 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition duration-300"
      >
        Volver
      </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesPelicula;