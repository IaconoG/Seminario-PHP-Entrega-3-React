import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importacion de funciones
import { obtenerPlataformas } from '../components/data/obtenerPlataformas';
import { obtenerGeneros } from '../components/data/obtenerGeneros';
import { eliminarDato } from '../components/data/eliminarDato';

// Importacion de estilos
import '../assets/css/modal.css';

const OpcionesComponent = (props) => {
	const baseURL = 'http://localhost:8000/public';
	const { opcion } = props.info;
	const [mensaje, setMessage] = useState([]);
	const [datos, setDatos] = useState([]);
	const [datoSeleccionado, setDatoSeleccionado] = useState(null);
	
	useEffect(() => {
		if (opcion === 'Genero') obtenerGeneros(baseURL, setDatos)
    else obtenerPlataformas(baseURL, setDatos)
	}, []);

	useEffect(() => {
		if (!sessionStorage.getItem('id')) return;
		const target = document.getElementById(sessionStorage.getItem('id'));
		if (!target) return; 
		target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		target.classList.add('enfoque');
		setTimeout(() => {
			target.classList.remove('enfoque');
		}, 3000);
		sessionStorage.removeItem('id');
	}, [datos]);

	
	const openModal = (dato, msj) => {
		setDatoSeleccionado(dato);
		const modal = document.querySelector('.modal');
		modal.style.display = 'block';
		modal.querySelector('h2').textContent = msj;
		if (dato === null) {
			let btns = modal.querySelectorAll('button');
			btns[0].style.display = 'none';
			btns[1].textContent = 'Cerrar';
		}
	}
	const closeModal = () => {
		const modal = document.querySelector('.modal');
		modal.style.display = 'none';
		let btns = modal.querySelectorAll('button');
		btns[0].style.display = 'block';
		btns[1].textContent = 'Aceptar';
	}
	
	const handleEliminar = () => {
		Promise.all([eliminarDato(baseURL, setMessage, opcion, datoSeleccionado)])
		.then(() => {
			setDatos(datos.filter((d) => d.id !== datoSeleccionado.id)); // No se realiza la consulta a la base de datos para actualizar la lista :D
			closeModal();
		})
	}
	const handleEditarClick = (dato) => {
		sessionStorage.setItem('dato', JSON.stringify(dato));
		sessionStorage.setItem('accion', 'Editar');
		sessionStorage.setItem('opcion', opcion);
	}
	const handelCrearClick = () => {
		sessionStorage.setItem('accion', 'Crear');
		sessionStorage.setItem('opcion', opcion);
	}


	useEffect(() => {
    if (mensaje.length === 0) return;
    openModal(null, mensaje[0]);
    setMessage([]);
  }, [mensaje])

  return (
    <main className='main'>
			<div className="modal">
				<div className='contenido-modal'>
					<h2>Cargando...</h2>
					<div className='btns-modal'>
						<button onClick={() => handleEliminar()}>Aceptar</button>
						<button onClick={() => closeModal()}>Cancelar</button>
					</div>
				</div>
			</div>
			<div className="contenido contenido-opciones">
				<div>
					<h1>{opcion+'s'}</h1>
					<Link to={`/${opcion.toLowerCase()}s/new`}>
						<button className='fix-btn' onClick={handelCrearClick}>Crear {opcion}</button>
					</Link>
				</div>
				<div className='contenedor'>
					{
						datos.map((dato, idx) => {
							let alias  = dato.nombre.toLowerCase()?.replace(/ /g, "-");
								// .reaplace -> reemplaza un caracter por otro 
      						// / /g -> busca todos los espacios en blanco
							return (
								<div id={dato.id} className="opcion" key={idx}>
									<div className='titulo-opcion'>
										<h3>{dato.nombre}</h3>
									</div>
									<div className='acciones'>
										<Link to={`edit/${alias}`}>
											<button onClick={() => handleEditarClick(dato)}>Editar</button>
										</Link>
										<button onClick={() => openModal(dato, '¿Estas seguro de eliminar el '+opcion.toLowerCase()+' "'+dato.nombre+'" ?')}>Eliminar</button>
									</div>
								</div>
							)
						})
					}
				</div>
			</div> 
		</main>
  )
}

export default OpcionesComponent;