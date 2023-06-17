import React from 'react';

import NavBarComponent from './NavBarComponent';

// Import assets
import '../assets/css/header.css'
import logo from "../assets/img/joystick-color.png";

const HeaderComponent = () => {
  return (
    <header>
      <div className="bloque-logo">
        <div className="nombre-pagina">
          <h1>GameStore</h1>
        </div>
        <div className="logo">  
          <img src={logo} alt="Icono de la pagina" />
        </div>
        <NavBarComponent />
      </div>
      {/* Menu de la pagina  */}
    </header>
  )
}

export default HeaderComponent;