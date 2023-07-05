import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import Formulario from '../components/FormularioComponent';

// Acciones
import { editarOpcion } from '../components/data/editarDato';

const EditPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const navigate = useNavigate();
  const location = useLocation();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!location.state) navigate('/no-page');
    else setRender(true);
  }, [navigate, location]);
  
  const { dato, accion, opcion } = location.state ?? { dato: null, accion: null, opcion: null };
  const [volver, setVolver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const fromRef = useRef(null);

  const handleButton = (e) => {
    e.preventDefault(); // Evita que se recargue la pagina
    const input = fromRef.current.nombre;
    const nombre = input.value;
    if (nombre === '') {
      input.classList.add('mal');
      setMessage(['El nombre no puede estar vacio']);
    } else {
      input.classList.add('bien');
      dato.nombre = nombre;
      editarOpcion(baseURL, setMessage, opcion, dato);
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
      {!render ? ( 
        <>
          <main className='main'>
            <h1>Cargando...</h1>
          </main>
        </>
      )
      : (
        <>
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
          <Formulario list={{handleButton, accion: accion, opcion: opcion, placeholder: dato?.nombre, defaultValue: dato?.nombre, fromRef}} />
        </>
      )}
      <Footer />
    </>
  );
}

export default EditPage;