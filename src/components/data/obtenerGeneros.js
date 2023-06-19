/* 
  Este archivo contiene la función que se encarga de obtener los géneros de la api
*/
import axios from 'axios';

const obtenerGeneros = async (baseURL, setGeneros) => {
  await axios.get(baseURL + '/generos')
    .then(response => {
      setGeneros(response.data.datos);    
    })
    .catch(error => {});
}

export { obtenerGeneros };