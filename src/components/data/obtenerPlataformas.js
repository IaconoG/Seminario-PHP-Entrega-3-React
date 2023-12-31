/*
  Este archivo se encarga de obtener las plataformas de la API al comienzo de la aplicación
*/
import axios from 'axios';

const obtenerPlataformas = async (baseURL, setPlataformas) => {
  await axios.get(baseURL + '/plataformas')
    .then(response => {
      setPlataformas(response.data.datos);
    })
    .catch(error => {});
};

export { obtenerPlataformas };