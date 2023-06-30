import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import Formulario from '../components/FormularioComponent';
// Acciones
import { crearDato } from '../components/data/crearDato';

const EditPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [volver, setVolver] = useState(false);
  const accion = sessionStorage.getItem('accion');
  let opcion = sessionStorage.getItem('opcion');
  const placeholder = (opcion === 'Genero') ? 'Accion' : 'PlayStation 5';

  const handleButton = (e) => {
    e.preventDefault(); // Evita que se recargue la pagina
    const form = document.getElementById('form-editar');
    const input = form.nombre;
    const nombre = form.nombre.value;
    const borderColor = { bien: '#4caf50', mal: '#f44336 '};

    if (nombre === '') {
      input.style.borderColor = borderColor.mal;
      setMessage(['El nombre no puede estar vacio']);
    } else {
      let dato = { nombre: nombre };
      input.style.borderColor = borderColor.bien;
      setVolver(true);
      crearDato(baseURL, setMessage, opcion, dato);
    }
    // Restablecer los colores después de 2.5 segundos
    setTimeout(() => {
      input.style.borderColor = '';
    }, 2500);
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
    if (volver) navigate('/' + opcion.toLocaleLowerCase()+ 's');
	}

  useEffect(() => {
    if (message === '') return;
    openModal(message);
    setMessage('');
  }, [message])

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
      <Formulario list={{handleButton, accion: accion, opcion: opcion, placeholder: placeholder, defaultValue: ''}} />
      <Footer />
    </>
  );
}

export default EditPage;