import { useState, useEffect } from 'react';

// Hook personalizado para manejar la lógica de películas y favoritas
const usePeliculas = () => {
  const CLAVE_API = 'a2b30413';
  const URL_API = `https://www.omdbapi.com/?apikey=${CLAVE_API}`;

  const [peliculas, setPeliculas] = useState([]);
  const [favoritas, setFavoritas] = useState(
    JSON.parse(localStorage.getItem('favoritas')) || []
  );

  // Cargar películas recientes (simulando "Now Playing")
  useEffect(() => {
    const anioActual = 2025; // Usamos 2025 para incluir películas como Minecraft
    fetch(`${URL_API}&s=movie&y=${anioActual}&type=movie`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        console.log('Datos de OMDb:', datos); // Log para depurar
        if (datos.Search) {
          setPeliculas(datos.Search);
        } else {
          setPeliculas([]);
        }
      })
      .catch((error) => console.error('Error al obtener películas recientes:', error));
  }, [URL_API]);

  // Guardar favoritas en localStorage
  useEffect(() => {
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
  }, [favoritas]);

  // Buscar películas por título
  const buscarPeliculas = (terminoBusqueda) => {
    if (!terminoBusqueda.trim()) {
      alert('Por favor, ingrese un título de película.');
      return;
    }
    fetch(`${URL_API}&s=${terminoBusqueda}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (datos.Search) {
          setPeliculas(datos.Search);
        } else {
          setPeliculas([]);
        }
      })
      .catch((error) => console.error('Error al buscar películas:', error));
  };

  // Alternar película en favoritas
  const alternarFavorita = (pelicula) => {
    const esFavorita = favoritas.some((fav) => fav.imdbID === pelicula.imdbID);
    if (esFavorita) {
      setFavoritas(favoritas.filter((fav) => fav.imdbID !== pelicula.imdbID));
    } else {
      setFavoritas([...favoritas, pelicula]);
    }
  };

  return { peliculas, buscarPeliculas, favoritas, alternarFavorita };
};

/**
 * Custom hook for managing and retrieving movie-related data.
 *
 * @returns {any} The data or functionality provided by the usePeliculas hook.
 */

export default usePeliculas;