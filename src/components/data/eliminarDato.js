import axios from "axios";

const eliminarDato = async (baseURL, setMessage, opcion, dato, setsuccessElimnars) => {
  opcion = opcion.toLowerCase();
  await axios.delete(baseURL + '/'+opcion+'s/'+dato.id)
  .then(response => {
      let mensaje = (opcion === 'genero') ? response.data.mensaje?.replace('dato', opcion+' "'+dato.nombre+'"') : response.data.mensaje?.replace('El dato', 'La '+opcion+' '+dato.nombre);
      setMessage(response.status+ ': '+ mensaje);
      setsuccessElimnars(true);
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) setMessage(error.response.status+ ': Ha ocurrido un error inesperado en el servidor. Por favor, inténtalo nuevamente más tarde.');
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

export { eliminarDato };