/* 
  Este archivo contiene la función que se encarga de eliminar toda la informacoin de la BD.
*/
import axios from "axios";


const vaciarTabla = async (baseURL, contenedorMensajes, tabla) => {
  await axios.delete(baseURL + '/'+tabla+'/todos')
    .then(response => {
      contenedorMensajes.push(response.status+ ': '+ response.data.mensaje);
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) contenedorMensajes.push(error.response.status+ ': '+ error.response.data['error PDO']);
        else contenedorMensajes.push(error.response.status+ ': '+ error.response.data.error);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        contenedorMensajes.push(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        contenedorMensajes.push('Algo paso al preparar la petición que lanzo un Error.');
      }
    });
}

export { vaciarTabla };