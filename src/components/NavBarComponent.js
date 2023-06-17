import React from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/generos'>Generos</Link>
        </li>
        <li>
          <Link to='/plataformas'>Plataformas</Link>
        </li>
      </ul>
    </nav>
  );
}


export default NavBarComponent;