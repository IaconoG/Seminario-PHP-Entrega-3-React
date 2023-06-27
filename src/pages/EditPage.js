import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

// Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import Formulario from '../components/FormularioComponent';

// Acciones
import { editarOpcion } from '../components/data/editarDato';

const EditPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const dato = JSON.parse(sessionStorage.getItem('dato'));

  const accion = sessionStorage.getItem('accion');
  let opcion = sessionStorage.getItem('opcion');
  const navigate = useNavigate();
  const [volver, setVolver] = useState(false);
  
  const [mensaje, setMessage] = useState([]);

  const handleButton = (e) => {
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
      setVolver(true);
    }
    // Restablecer los colores después de 2.5 segundos
    setTimeout(() => {
      input.style.borderColor = '';
    }, 2000);
  }

  const openModal = (msj) => {
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      modal.style.display = 'block';
      modal.querySelector('h2').textContent = msj;
    }, 250);
	}
	const closeModal = () => {
		const modal = document.querySelector('.modal');
		modal.style.display = 'none';
    opcion = opcion.toLocaleLowerCase()+ 's';
    if (volver) navigate('/' + opcion);
	}

  useEffect(() => {
    if (mensaje.length === 0) return;
    openModal(mensaje[0]);
    setMessage([]);
  }, [mensaje])


  return (
    <>
      <Header />
      <div className="modal">
				<div className='contenido-modal'>
					<h2>Cargando...</h2>
					<div className='btns-modal'>
						<button onClick={() => closeModal()}>Cerrar</button>
					</div>
				</div>
			</div>
      <Formulario list={{handleButton, accion: accion, opcion: opcion, placeholder: dato.nombre, defaultValue: dato.nombre}} />
      <Footer />
    </>
  );
}

export default EditPage;