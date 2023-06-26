import axios from "axios";

const editarOpcion = async (baseURL, setMessage, opcion, dato) => {
  opcion = opcion.toLowerCase()+'s';
  await axios.patch(baseURL + '/'+opcion+'/'+dato.id, dato)
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
        setMessage(prevMessage => [...prevMessage, error.message+': La petición fue hecha pero no se recibió respuesta.']);
      } else {
        setMessage(prevMessage => [...prevMessage, 'Algo paso al preparar la petición que lanzo un Error.']);
      }
    });  
}

export { editarOpcion };