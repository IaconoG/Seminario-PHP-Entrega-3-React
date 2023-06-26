import { useState, useEffect } from 'react';

// Importacion de componentes
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import Opciones from '../../components/OpcionesComponent';

// Importacion de funciones
import { obtenerGeneros } from '../../components/data/obtenerGeneros';

// Importacion de estilos
import '../../assets/css/generos_plataformas.css';

const GenerosPage = () => {
  const baseURL = 'http://localhost:8000/public';
	const [generos, setGeneros] = useState([]);

	useEffect(() => {
    obtenerGeneros(baseURL, setGeneros)
  }, []);


	return (
		<>
			<Header />
			<Opciones info={{ datos: generos, opcion: 'Genero' }} />
			<Footer />
	</>
	)
}

export default GenerosPage;