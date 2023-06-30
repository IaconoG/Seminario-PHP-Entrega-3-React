import axios from "axios";

const editarOpcion = async (baseURL, setMessage, opcion, dato) => {
  opcion = opcion.toLowerCase()+'s';
  await axios.patch(baseURL + '/'+opcion+'/'+dato.id, dato)
    .then(response => {
      let mensaje = (opcion === 'genero') ? response.data.mensaje?.replace('dato', opcion+' "'+dato.nombre+'"') : response.data.mensaje?.replace('El dato', 'La '+opcion+' '+dato.nombre);
      setMessage(response.status+ ': '+ mensaje);
    })
    .catch(function (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
        if (error.response.status === 500) setMessage(error.response.status+ ': Ha ocurrido un error inesperado en el servidor. Por favor, inténtalo nuevamente más tarde.');
        else setMessage(error.response.status+ ': '+error.response.data.error);
        console.log(error.response)
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta `error.request` es una instancia de XMLHttpRequest en el navegador y
        // una instancia de http.ClientRequest en node.js
        setMessage(error.message+': La petición fue hecha pero no se recibió respuesta.');
      } else {
        setMessage('Algo paso al preparar la petición que lanzo un Error.');
      }
    });  
}

export { editarOpcion };