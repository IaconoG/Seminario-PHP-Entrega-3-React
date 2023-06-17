import React, { useEffect, useState } from 'react';
  // useEffect -> Hook de react que permite ejecutar codigo cuando se renderiza el componente
    // hook -> funcion que permite agregarle funcionalidad a un componente
  // useEffect -> se ejecuta después de que el componente se renderiza en el DOM
import axios from 'axios';

// Importacion de componentes
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';

// Importacion de assets
import '../../assets/css/dashboard.css';
import { ajustarSelects } from '../../assets/js/ajustarSelects';

// Importacion de datos
import { obtenerGeneros } from '../../components/data/obtenerGeneros';
import { obtenerPlataformas } from '../../components/data/obtenerPlataformas';
import { obtenerJuegosFiltados } from '../../components/data/obtenerJuegosFiltrados';
import { obtenerNombres } from '../../components/data/obtenerNombres';

const  DashboardPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const [juegos, setJuegos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    // --- Obtener datos de la api ---
    obtenerNombres(baseURL, setNombres, setErrores);
    Promise.all([obtenerGeneros(baseURL, setGeneros, setErrores), obtenerPlataformas(baseURL, setPlataformas, setErrores)])
    .then(() => {
      ajustarSelects();
    });
      // Promise.all -> permite ejecutar varias promesas al mismo tiempo
      // .then -> se ejecuta cuando todas las promesas se resuelven
      // Esto nos garantiza que los estados generos y plataformas ya hayan sido actualizados antes de llamar a ajustarSelects().
    obtenerJuegosFiltados(baseURL, setJuegos, setErrores, {nombre:'', plataforma:'', genero:'', orden: 'ASC'});
  }, []); 

  // === Evento envio del formulario ===
  const handleSubmitFiltro = (event) => {
    event.preventDefault();
    
    let nombre = event.target.elements.nombres.value;
    let plataforma = event.target.elements.plataformas.value;
    let genero = event.target.elements.generos.value;
    let orden = event.target.elements.ordenamiento.value;
    
    // Llamada a la función de filtrarJuegos con los valores del formulario
    obtenerJuegosFiltados(baseURL, setJuegos, setErrores, {nombre: nombre, plataforma: plataforma, genero: genero, orden: orden});
  };

  return (
    <>
      <Header />
      {/*Cuerpo de la pagina*/}
      <main className="main">
        <div className="contenido">
          {/*  Seccion que contiene los filtors del contenido */}
          <aside className="filtros">
            <h3>Filtros</h3>
            <form id="form-filtro" className="from-filtros" onSubmit={handleSubmitFiltro}> 
              {/* Filtro por nombre */}
              <div className="bloque-filtro-nombre">
                <label htmlFor="nombres" className="titulo-filtro">Por nombre</label>
                <input id="nombres" name="nombres" list="listado-nombres" />
                <datalist id="listado-nombres">
                  {
                    nombres.map((nombre, idx) => {
                      return (
                        <option key={idx} value={nombre} name={nombre}></option>
                      )
                    })
                  }
                </datalist>
              </div>
              {/* Filtro por genero */}
              <div className="bloque-filtro-genero">
                <label htmlFor="generos" className="titulo-filtro">Por Genero</label>
                <select name="generos" id="generos" title="listado-generos">
                  <option value="">Ninguna selección</option>
                  {
                    generos.map(genero => {
                      return (
                        <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                      );
                    })
                    
                  }
                </select>
              </div>
              {/* Filtro por plataforma */}
              <div className="bloque-filtro-plataforma">
                <label htmlFor="plataformas" className="titulo-filtro">Por plataforma</label>
                <select name="plataformas" id="plataformas" title="listado-plataformas">
                  <option value="">Ninguna selección</option>
                  {
                    plataformas.map(plataforma => {
                      return (
                        <option key={plataforma.id} value={plataforma.id}>{plataforma.nombre}</option>
                      );
                    })
                    
                  }
                </select>
              </div>
              <div className="ordenamiento_juego">
              {/* Ordenamiento por A-Z */}
              <label htmlFor="ordenamiento" className="titulo-filtro">ordenamiento</label>
              <select name="ordenamiento" id="ordenamiento" title="listado-ordenamientos"> 
                <option key='1' value="ASC">A - Z</option>
                <option key='2' value="DESC">Z - A</option>
              </select>
            </div>
              <input type="submit" value="Filtrar"></input>
            </form>
          </aside>
          {/* Seccion que muestra el contenido */}
          <section className="juegos">
            <div className="bloque-juegos">
            {
              juegos.map(juego => {
                return (
                  <div className='juego' id={juego.nombre}>
                    <div className="header-juego">
                      <img src={`data:${juego.tipo_imagen};base64,${juego.imagen}`} alt={`Portada del ${juego.nombre}`} loading="lazy" />
                    </div>
                    <div className="contenido-juego">
                      <div className="contenedor-titulo-juego">
                        <p className="titulo-juego">{juego.nombre}</p>
                        <div className="subrallado"></div>
                      </div>
                      <p className="descripcion-juego">{juego.descripcion}</p>
                      <div>
                        <p className="contenido-subtitulo">plataforma</p>
                        <ul className="plataformas-juego">
                          <li>{
                            plataformas.find(plataforma => plataforma.id === juego.id_plataforma)?.nombre
                          }</li>
                        </ul>
                      </div>
                      <div>
                        <p className="url-juego contenido-subtitulo">pagina oficial</p>
                        <ul className="url-juego">
                          <li className="url">
                            <a href={juego.url} target='_blank' rel='noopener noreferrer'>{juego.url}</a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="contenido-subtitulo">genero</p>
                        <ul className="generos-juego">
                          <li>{
                            generos.find(genero => genero.id === juego.id_genero)?.nombre
                          }</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default DashboardPage;