/*
  Este archivo se encarga de obtener los nombres de los juegos de la API
*/
import axios from 'axios';

const obtenerNombres = async (baseURL, setNombres, setErrores) => {
  await axios.get(baseURL + '/juegos')
    .then(response => {
      const juegos = response.data.datos;
      let nombres = [];
      for (let i = 0; i < juegos.length; i++) {
        nombres.push(juegos[i].nombre);
      }
      setNombres(nombres);
    })
    .catch(error => { // FIXME: No puedo atrar los errores de la api, primero me toma el errore de axios
      setErrores(error);
    });
}

export { obtenerNombres };