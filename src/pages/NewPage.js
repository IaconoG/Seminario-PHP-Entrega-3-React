import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import Formulario from '../components/FormularioComponent';
// Acciones
import { crearDato } from '../components/data/crearDato';

const EditPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const navigate = useNavigate();
  const location = useLocation();
  const { accion, opcion } = location.state;
  const fromRef = useRef(null);
  const placeholder = (opcion === 'Genero') ? 'Accion' : 'PlayStation 5';
  const [message, setMessage] = useState('');
  const [volver, setVolver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButton = (e) => {
    e.preventDefault(); // Evita que se recargue la pagina
    const input = fromRef.current.nombre;
    const nombre = input.value;
    if (nombre === '') {
      input.classList.add('mal');
      setMessage(['El nombre no puede estar vacio']);
    } else {
      input.classList.add('bien');
      let dato = { nombre: nombre };
      crearDato(baseURL, setMessage, opcion, dato);
      setVolver(true);
    }
    // Restablecer los colores después de 2.5 segundos
    setTimeout(() => {
      input.classList.remove('bien') || input.classList.remove('mal');
    }, 2000);
  }
  
	const closeModal = () => {
    setShowModal(false);
    setMessage('');
    if (volver) navigate('/' + opcion.toLocaleLowerCase()+ 's');
	}
  useEffect(() => {
    if (message === '') return;
    setShowModal(true);
  }, [message])

  return (
    <>
      <Header />
      {showModal && (
          <div className="modal">
            <div className='contenido-modal'>
              <h2>{message}</h2>
              <div className='btns-modal'>
                <button onClick={() => closeModal()}>Cerrar</button>
              </div>
            </div>
          </div>
          )
        }
      <Formulario list={{handleButton, accion: accion, opcion: opcion, placeholder: placeholder, defaultValue: '', fromRef}} />
      <Footer />
    </>
  );
}

export default EditPage;