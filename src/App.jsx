import React, { useState } from 'react';
import BarraBusqueda from './components/BarraBusqueda';
import TarjetaPelicula from './components/TarjetaPelicula';
import DetallesPelicula from './components/DetallesPelicula';
import Favoritas from './components/Favoritas';
import usePeliculas from './hooks/usePeliculas';
import './App.css';

function App() {
  const [vista, setVista] = useState('inicio');
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const { peliculas, buscarPeliculas, favoritas, alternarFavorita } = usePeliculas();

  const manejarSeleccionPelicula = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
    setVista('detalles');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-between">
      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white shadow-md p-4 rounded-lg">
        <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-4 sm:mb-0">
        QuickFlicks
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setVista('inicio')}
            className="px-5 py-2 rounded-full bg-blue-800 text-white font-semibold hover:bg-blue-700"
          >
            Inicio
          </button>
          <button
            onClick={() => setVista('favoritas')}
            className="px-5 py-2 rounded-full bg-blue-800 text-white font-semibold hover:bg-blue-700"
          >
            Favoritas
          </button>
        </div>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-grow">
        {vista === 'inicio' && (
          <div>
            <div className="flex justify-center mb-8">
              <BarraBusqueda enBuscar={buscarPeliculas} />
            </div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
              Películas Recientes
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {peliculas.length === 0 ? (
                <p className="text-blue-900">No se encontraron películas.</p>
              ) : (
                peliculas.map((pelicula) => (
                  <TarjetaPelicula
                    key={pelicula.imdbID}
                    pelicula={pelicula}
                    onClick={manejarSeleccionPelicula}
                    esFavorita={favoritas.some((fav) => fav.imdbID === pelicula.imdbID)}
                    alternarFavorita={alternarFavorita}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {vista === 'detalles' && peliculaSeleccionada && (
          <DetallesPelicula pelicula={peliculaSeleccionada} enVolver={() => setVista('inicio')} />
        )}

        {vista === 'favoritas' && (
          <Favoritas
            favoritas={favoritas}
            enSeleccionarPelicula={manejarSeleccionPelicula}
            alternarFavorita={alternarFavorita}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 mt-10 text-center rounded-lg text-sm text-gray-600">
        © {new Date().getFullYear()} Buscador de Películas. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;