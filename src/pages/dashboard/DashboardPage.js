import React, { useEffect, useState } from 'react';
  // useEffect -> Hook de react que permite ejecutar codigo cuando se renderiza el componente
    // hook -> funcion que permite agregarle funcionalidad a un componente
  // useEffect -> se ejecuta después de que el componente se renderiza en el DOM

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
import { cargarData } from '../../components/data/cargarData.js';
import { vaciarTabla } from '../../components/data/vaciarTabla.js'; 

const  DashboardPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const [juegos, setJuegos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [message, setMessage] = useState([]);
  const [estadoBtnCargaDatos, setEstadoBtnCargaDatos] = useState(false);
  const [estadoBtnEliminarDatos, setEstadoBtnEliminarDatos] = useState(false);
  const [estadoAjusteSelects, setEstadoAjusteSelects] = useState(false);

  useEffect(() => {
    obtenerNombres(baseURL, setNombres);
    Promise.all([ obtenerGeneros(baseURL, setGeneros),  obtenerPlataformas(baseURL, setPlataformas)
      .then(() => { setEstadoAjusteSelects(true); })
    ]);
    obtenerJuegosFiltados(baseURL, setJuegos, {nombre:'', plataforma:'', genero:'', orden: 'ASC'});
  }, []);

  useEffect(() => {
    if (estadoAjusteSelects) {
      ajustarSelects();
      setEstadoAjusteSelects(false);
    }
  }, [estadoAjusteSelects]);

  useEffect(() => {
    if (estadoBtnCargaDatos) {
      Promise.all([ cargarData(baseURL, setMessage, 'generos'), cargarData(baseURL, setMessage, 'plataformas')])
        .then (() => {
          Promise.all([ cargarData(baseURL, setMessage, 'juegos')])
            .then(() => { 
              obtenerJuegosFiltados(baseURL, setJuegos, {nombre:'', plataforma:'', genero:'', orden: 'ASC'});
            });
          Promise.all([ obtenerGeneros(baseURL, setGeneros),  obtenerPlataformas(baseURL, setPlataformas)])
            .then(() => { setEstadoAjusteSelects(true); })
        })
      setEstadoBtnCargaDatos(false);
    }
  }, [estadoBtnCargaDatos]); 

  useEffect (() => {
    if (estadoBtnEliminarDatos) {
      // FIXME: Esto es para la pagina de plataformas y generos aca no deberiamos utilizarlo
      // Promise.all([ vaciarTabla(baseURL, setMessage, 'plataformas'), vaciarTabla(baseURL, setMessage, 'generos')
      //   .then(() => { 
      //     Promise.all([ obtenerGeneros(baseURL, setGeneros),  obtenerPlataformas(baseURL, setPlataformas)
      //       .then(() => { setEstadoAjusteSelects(true); })
      //     ]);
      //   })
      // ]);
      Promise.all([ vaciarTabla(baseURL, setMessage, 'juegos') ])
        .then(() => {  setJuegos([]); })
      setEstadoBtnEliminarDatos(false);
    }
  }, [estadoBtnEliminarDatos]);

  useEffect(() => {
    if (message.length > 0) {
      for (let i = 0; i < message.length; i++) {
        console.log(message[i]); // FIXME: mostrar display
      }
      setMessage([]);
    } 
  }, [message]);
  

  const handleSubmitFiltro = (event) => {
    event.preventDefault();
    let nombre = event.target.elements.nombres.value || '';
    let plataforma = event.target.elements.plataformas.value || '';
    let genero = event.target.elements.generos.value || '';
    let orden = event.target.elements.ordenamiento.value || '';
    // Llamada a la función de filtrarJuegos con los valores del formulario
    obtenerJuegosFiltados(baseURL, setJuegos, {nombre: nombre, plataforma: plataforma, genero: genero, orden: orden});
    // Mostrar msg de la api // FIXME: CREAR EL COSO EN EL NAVBAR PARA MOSTRAR EL MSJ
  };

  // === Cargar datos a la BD ===
  const handleCargarDatos = () => {
    setEstadoBtnCargaDatos(true);
  }
  // === Eliminar juegos de la BD ===
  const handleElimnarJuegos = () => {
    setEstadoBtnEliminarDatos(true);
  }


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

            <div className='contenedor-cargar-datos'>
              <h3>Acciones</h3>
              <input type="submit" value="Cargar Data" onClick={handleCargarDatos}></input>
              <input type="submit" value="Eliminar Juegos" onClick={handleElimnarJuegos}></input>
            </div>

          </aside>
          {/* Seccion que muestra el contenido */}
          <section className="juegos">
            <div className="bloque-juegos">
            {
              juegos.map((juego, idx) => {
                return (
                  <div className='juego' id={juego.nombre} key={idx}>
                    <div className="header-juego">
                      <img src={`data:${juego.tipo_imagen};base64,${juego.imagen}`} alt={`Portada de ${juego.nombre}`} loading="lazy" />
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