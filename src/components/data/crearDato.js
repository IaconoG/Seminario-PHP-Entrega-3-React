import axios from "axios";

const crearDato = async (baseURL, setMessage, opcion, dato) => {
  opcion = opcion.toLowerCase()+'s';
  await axios.post(baseURL + '/'+opcion, dato)
    .then(response => {
      setMessage(response.status+ ': '+ response.data.mensaje?.replace('Dato', 'El dato '+dato.nombre));
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) setMessage(error.response.status+ ': Ha ocurrido un error inesperado en el servidor. Por favor, inténtalo nuevamente más tarde.');
        else if (error.response.status === 400) setMessage(error.response.status+ ': '+(error.response.data.error?.nombre || error.response.data.error));
          // Obtenemos nombre si existe, esto igual es utilizado en los casos de plataformas y generos. En cambio si estuvieramos creando un juego, deberiamos obtener todos los campos no solo nombre.
        else setMessage(error.response.status+ ': '+error.response.data.error);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        setMessage(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        setMessage('Algo paso al preparar la petición que lanzo un Error.');
      }
    });  
}

export { crearDato };