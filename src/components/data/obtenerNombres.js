/*
  Este archivo se encarga de obtener los nombres de los juegos de la API
*/
import axios from 'axios';

const obtenerNombres = async (baseURL, setNombres) => {
  await axios.get(baseURL + '/juegos')
    .then(response => {
      const juegos = response.data.datos;
      let nombres = [];
      for (let i = 0; i < juegos.length; i++) {
        nombres.push(juegos[i].nombre);
      }
      setNombres(nombres);
    })
    .catch(error => {});
}

export { obtenerNombres };
