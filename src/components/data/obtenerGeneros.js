/* 
  Este archivo contiene la función que se encarga de obtener los géneros de la api
*/
import axios from 'axios';

const obtenerGeneros = async (baseURL, setGeneros, setErrores) => {
  await axios.get(baseURL + '/generos')
    .then(response => {
      setGeneros(response.data.datos);
    })
    .catch(error => { // FIXME: No puedo atrar los errores de la api, primero me toma el errore de axios
      setErrores(error);
    });
}

export { obtenerGeneros };