import React from 'react';
import { Link } from 'react-router-dom';

import NavBarComponent from './NavBarComponent';

// Import assets
import '../assets/css/header.css'
import logo from "../assets/img/joystick-color.png";

const HeaderComponent = () => {
  return (
    <header>
      <div class="bloque-logo">
        <div class="nombre-pagina">
          <h1>GameStore</h1>
        </div>
        <div to='/' class="logo">  {/* FIXME: Debo cambiar los anchor por LINK ver el link en README */}
          <img src={logo} alt="Icono de la pagina" />
        </div>
        <NavBarComponent />
      </div>
      {/* Menu de la pagina  */}
    </header>
  )
}

export default HeaderComponent;