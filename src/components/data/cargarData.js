/* 
  Este archivo contiene la función que se encarga de cargar tanto como los generos, platafromas y juegos a la base de datos.
  Esta carga se realizar con el fin de testear la base de datos con datos ya cargados.
  La informacion a cargar se encuenta en la api en los archivos json.

*/
import axios from "axios";

const cargarData = async (baseURL, setMessage, tabla) => {
  // --- Cargar Generos ---
  await axios.post(baseURL + '/'+tabla+'/todos')
    .then(response => {
      setMessage(prevMessage => [...prevMessage, response.status+ ': '+ response.data.mensaje]);
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) setMessage(prevMessage => [...prevMessage, error.response.status+ ': '+ error.response.data['error PDO']]);
        else setMessage(prevMessage => [...prevMessage, error.response.status+ ': '+ error.response.data.error]);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        console.log(error.message+': La petición fue hecha pero no se recibió respuesta.');
        setMessage(prevMessage => [...prevMessage, error.message+': La petición fue hecha pero no se recibió respuesta.']);
      } else {
        console.log(error.message);
        setMessage(prevMessage => [...prevMessage, 'Algo paso al preparar la petición que lanzo un Error.']);
      }
    });  
}

export { cargarData };
