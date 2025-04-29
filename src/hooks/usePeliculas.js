import { useState, useEffect } from 'react';


const usePeliculas = () => {
  const CLAVE_API = 'a2b30413';
  const URL_API = `https://www.omdbapi.com/?apikey=${CLAVE_API}`;

  const [peliculas, setPeliculas] = useState([]);
  const [favoritas, setFavoritas] = useState(
    JSON.parse(localStorage.getItem('favoritas')) || []
  );

  // En este apartado carga las peliculas y ademas se simula el now playing
  useEffect(() => {
    const anioActual = 2025; 
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

  // aqui guarda las favoritas localStorage
  useEffect(() => {
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
  }, [favoritas]);

  // aca se buscan las peliculas por medio del titulo
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
 * 
 *
 * @returns {any} T
 * */

export default usePeliculas;