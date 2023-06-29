// Componentes
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';

// Estilos
import '../assets/css/dashboard.css';
import '../assets/css/no_page.css';

import logo from "../assets/img/joystick.png";


const NoPage = () => {
	return (
		<>
			<Header />
			<main className='main-mensaje'>
				<div className="contenedor-mensaje">
					<h1>404</h1>
					<h2>Esta no es una página de GameStore.</h2>
					<p>Por favor use el sitio web para navegar entre las distintas páginas.<br /> No intente navegar manualmente.</p>
					<i>GameStore - Iacono Gianfranco</i>

					
					<img typeof='' src={logo} alt='logo' />
				</div>
			</main>
			<Footer />
		</>
	)
}

export default NoPage