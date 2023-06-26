
import { Link } from 'react-router-dom';

const OpcionesComponent = (props) => {
	const { datos, opcion } = props.info;
  return (
    <main className='main'>
			<div className="contenido contenido-opciones">
				<div>
					<h1>{opcion+'s'}</h1>
					<Link to={`/${opcion.toLowerCase()}s/new`} state={{ accion: 'Crear', opcion: opcion }}>
						<button className='fix-btn'>Crear {opcion}</button>
					</Link>
				</div>
				<div className='contenedor'>
					{
						datos.map((dato, id) => {
							let alias  = dato.nombre.toLowerCase().replace(/ /g, "-");
								// .reaplace -> reemplaza un caracter por otro 
      						// / /g -> busca todos los espacios en blanco
							return (
								<div className="opcion" key={id}>
									<div className='titulo-opcion'>
										<h3>{dato.nombre}</h3>
									</div>
									<div className='acciones'>
										<Link to={`edit/${alias}`} state={{ dato: dato, accion: 'Editar', opcion: opcion }}>
											<button>Editar</button>
										</Link>
										<button>Eliminar</button>
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