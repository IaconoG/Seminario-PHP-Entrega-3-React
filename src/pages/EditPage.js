import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
  // useLocation -> Hook que devuelve el objeto que contiene información sobre la dirección URL actual.
    // hash -> el anchor (el #) en la URL.
    // pathname -> la ruta de la URL.
    // search -> la cadena de consulta de la URL.
    // state -> el estado de la ubicación.
    // key -> la clave de la ubicación. Útil para comparar dos ubicaciones en el historial del usuario.

// Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import Formulario from '../components/FormularioComponent';

// Acciones
import { editarOpcion } from '../components/data/editarDato';

const EditPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const location = useLocation();
  const { dato, accion, opcion } = location.state;

  const [mensaje, setMessage] = useState([]);

  const handleChange = (e) => {
    e.preventDefault(); // Evita que se recargue la pagina
    const form = document.getElementById('form-editar');
    const input = form.nombre;
    const nombre = form.nombre.value;
    const borderColor = { bien: '#4caf50', mal: '#f44336 '}

    if (nombre === '') {
      input.style.borderColor = borderColor.mal;
      setMessage(['El nombre no puede estar vacio']);
    } else {
      input.style.borderColor = borderColor.bien;
      dato.nombre = nombre;
      editarOpcion(baseURL, setMessage, opcion, dato);
    }
    // Restablecer los colores después de 2.5 segundos
    setTimeout(() => {
      input.style.borderColor = '';
    }, 2500);
  }

  useEffect(() => {
    if (mensaje.length === 0) return;
    console.log(mensaje[0]); // FIXME: mostrar display
    setMessage([]);

  }, [mensaje])


  return (
    <>
      <Header />
      <Formulario list={{handleChange, accion: accion, opcion: opcion, placeholder: dato.nombre, defaultValue: dato.nombre}} />
      
      <Footer />
    </>
  );
}

export default EditPage;