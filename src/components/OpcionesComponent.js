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
	const [message, setMessage] = useState('');
	const [datos, setDatos] = useState([]);
	const [datoSeleccionado, setDatoSeleccionado] = useState(null);
	const [successElimnar, setsuccessElimnar] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showBtnEliminar, setShowBtnEliminar] = useState(true);
	
	useEffect(() => {
		if (opcion === 'Genero') obtenerGeneros(baseURL, setDatos)
    else obtenerPlataformas(baseURL, setDatos)
	}, [opcion]);

	useEffect(() => {
		if (!successElimnar) return;
		if (opcion === 'Genero') obtenerGeneros(baseURL, setDatos)
    else obtenerPlataformas(baseURL, setDatos)
	}, [successElimnar]);

	const handleEliminar = () => {
		setShowBtnEliminar(false);
		eliminarDato(baseURL, setMessage, opcion, datoSeleccionado, setsuccessElimnar)
	}

	useEffect(() => {
		if (datoSeleccionado === null) return;
		setMessage(`¿Estás seguro de eliminar el ${opcion.toLowerCase()} "${datoSeleccionado.nombre}"?`);
	}, [datoSeleccionado]);

	const closeModal = () => {
    setShowModal(false);
		setMessage('');
		setDatoSeleccionado(null);
		setsuccessElimnar(false);
		setShowBtnEliminar(true);
	}
	useEffect(() => {
    if (message === '') return;
    setShowModal(true);
  }, [message])

  return (
    <main className='main'>
			{showModal && (
				<div className="modal">
            <div className='contenido-modal'>
              <h2>{message}</h2>
              <div className='btns-modal'>
								{showBtnEliminar && (<button onClick={() => handleEliminar()}>Aceptar</button>)}
                <button onClick={() => closeModal()}>Cerrar</button>
              </div>
            </div>
          </div>
          )
        }
			<div className="contenido contenido-opciones">
				<div>
					<h1>{opcion+'s'}</h1>
					<Link to={`/${opcion.toLowerCase()}s/new`} state={ {accion: 'crear', opcion} }>
						<button className='fix-btn'>Crear {opcion}</button>
					</Link>
				</div>
				<div className='contenedor'>
					{
						datos.map((dato, idx) => {
							let path  = "edit/"+dato.nombre.toLowerCase()?.replace(/ /g, "-");
								// .reaplace -> reemplaza un caracter por otro 
      						// / /g -> busca todos los espacios en blanco
							return (
								<div id={dato.id} className="opcion" key={idx}>
									<div className='titulo-opcion'>
										<h3>{dato.nombre}</h3>
									</div>
									<div className='acciones'>
										<Link to={path} state={ {dato, accion:'Editar', opcion} }>
											<button >Editar</button>
										</Link>
										<button onClick={() => setDatoSeleccionado(dato)}>Eliminar</button>
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