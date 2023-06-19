/* 
  Este archivo contiene la función que se encarga de cargar tanto como los generos, platafromas y juegos a la base de datos.
  Esta carga se realizar con el fin de testear la base de datos con datos ya cargados.
  La informacion a cargar se encuenta en la api en los archivos json.

*/
import axios from "axios";

const cargarData = async (baseURL, setMessage) => {
  let nuevosMensaje = [];
  // --- Cargar Generos ---
  await axios.post(baseURL + '/generos/todos')
    .then(response => {
      nuevosMensaje.push(response.status+ ': '+ response.data.mensaje);
    })
    .catch(error => { 
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) nuevosMensaje.push(error.response.status+ ': '+ error.response.data['error PDO']);
        else nuevosMensaje.push(error.response.status+ ': '+ error.response.data.error);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        nuevosMensaje.push(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        nuevosMensaje.push('Algo paso al preparar la petición que lanzo un Error.');
      }
    });
  // --- Cargar Plataformas ---
  await axios.post(baseURL + '/plataformas/todos')
    .then(response => {
      nuevosMensaje.push(response.status+ ': '+ response.data.mensaje);
    })
    .catch(error => { 
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) nuevosMensaje.push(error.response.status+ ': '+ error.response.data['error PDO']);
        else nuevosMensaje.push(error.response.status+ ': '+ error.response.data.error);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        nuevosMensaje.push(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        nuevosMensaje.push('Algo paso al preparar la petición que lanzo un Error.');
      }
    });
  // --- Cargar Juegos ---
//   // await axios.post(baseURL + '/juegos/todos')
//   //   .then(response => {
//   //     setMessage(message => [...message, response.data.mensaje])
//   //   })
//   //   .catch(error => { // FIXME: No puedo atrar los errores de la api, primero me toma el errore de axios
//   //     setMessage(errores => [...errores, error]);
//   //     setSuccess(false);
//   //   }
//   // );

  setMessage(prevMessage => [...prevMessage, ...nuevosMensaje]);
}

export { cargarData };
