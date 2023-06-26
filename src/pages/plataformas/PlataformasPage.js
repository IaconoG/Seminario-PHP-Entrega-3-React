import { useState, useEffect } from 'react';

// Importacion de componentes
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import Opciones from '../../components/OpcionesComponent';

// Importacion de funciones
import { obtenerPlataformas } from '../../components/data/obtenerPlataformas';

// Importacion de estilos
import '../../assets/css/generos_plataformas.css';

const PlataformaPage = () => {
  const baseURL = 'http://localhost:8000/public';
	const [plataformas, setPlataformas] = useState([]);

	useEffect(() => {
    obtenerPlataformas(baseURL, setPlataformas)
  }, []);


	return (
		<>
			<Header />
			<Opciones info={{ datos: plataformas, opcion: 'Plataforma' }} />
			<Footer />
	</>
	)
}

export default PlataformaPage;