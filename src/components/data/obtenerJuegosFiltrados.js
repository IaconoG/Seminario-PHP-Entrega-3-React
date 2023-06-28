/*
  Este archivo se encarga de obtener los juegos filtrados de la API
*/

import axios from 'axios';

const obtenerJuegosFiltados = async (baseURL, setJuegos, filtro, setMessage) => {
  await axios.get(baseURL + '/juegos', {
    params: {
      nombre: filtro.nombre,
      id_plataforma: (filtro.plataforma !== '') ? Number(filtro.plataforma) : null,
      id_genero: (filtro.genero !== '') ? Number(filtro.genero) : null,
      orden: filtro.orden
    }})
    .then(response => {
      setJuegos(response.data.datos);
      setMessage(response.status+ ': Los datos fueron filtrados con exito.');
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) setMessage(error.response.status+ ': '+ error.response.data['error PDO']);
        else{ setMessage(error.response.status+ ': '+error.response.data['error']);
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        setMessage(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        setMessage('Algo paso al preparar la petición que lanzo un Error.');
      }
    });     
};

export { obtenerJuegosFiltados }
