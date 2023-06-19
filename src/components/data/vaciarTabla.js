/* 
  Este archivo contiene la función que se encarga de eliminar toda la informacoin de la BD.
*/
import axios from "axios";


const vaciarTabla = async (baseURL, setMessage, tabla) => {
  await axios.delete(baseURL + '/'+tabla+'/todos')
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

export { vaciarTabla };