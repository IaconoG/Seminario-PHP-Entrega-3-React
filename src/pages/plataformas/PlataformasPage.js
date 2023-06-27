// Importacion de componentes
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import Opciones from '../../components/OpcionesComponent';

// Importacion de estilos
import '../../assets/css/generos_plataformas.css';

const PlataformaPage = () => {
	return (
		<>
			<Header />
			<Opciones info={{ opcion: 'Plataforma' }} />
			<Footer />
	</>
	)
}

export default PlataformaPage;