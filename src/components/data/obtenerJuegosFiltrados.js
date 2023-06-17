/*
  Este archivo se encarga de obtener los juegos filtrados de la API
*/

import axios from 'axios';

const obtenerJuegosFiltados = async (baseURL, setJuegos, setErrores, filtro) => {
  await axios.get(baseURL + '/juegos', {
    params: {
      nombre: filtro.nombre,
      id_plataforma: (filtro.plataforma !== '') ? Number(filtro.plataforma) : null,
      id_genero: (filtro.genero !== '') ? Number(filtro.genero) : null,
      orden: filtro.orden
    }})
    .then(response => {
      setJuegos(response.data.datos);
    })
    .catch(error => {
      setErrores(error);
    });     
};

export { obtenerJuegosFiltados }
