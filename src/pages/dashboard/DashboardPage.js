import React, { useEffect, useState, useRef } from 'react';
  // useEffect -> Hook de react que permite ejecutar codigo cuando se renderiza el componente
    // hook -> funcion que permite agregarle funcionalidad a un componente
  // useEffect -> se ejecuta después de que el componente se renderiza en el DOM

// Importacion de componentes
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';

// Importacion de assets
import '../../assets/css/dashboard.css';

// Importacion de datos
import { obtenerGeneros } from '../../components/data/obtenerGeneros';
import { obtenerPlataformas } from '../../components/data/obtenerPlataformas';
import { obtenerJuegosFiltados } from '../../components/data/obtenerJuegosFiltrados';
import { cargarData } from '../../components/data/cargarData.js';
import { vaciarTabla } from '../../components/data/vaciarTabla.js'; 

const  DashboardPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const [juegos, setJuegos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const selectGenerosRef = useRef(null);
  const selectPlataformasRef = useRef(null);
  let contenedorMensajes = []

  useEffect(() => {
    obtenerGeneros(baseURL, setGeneros);
    obtenerPlataformas(baseURL, setPlataformas);
    obtenerJuegosFiltados(baseURL, setJuegos, {nombre:'', plataforma: null, genero: null, orden: 'ASC'}, () => {});
  }, []);

  useEffect(() => {
      const cantOpciones = (selectGenerosRef.current.options.length > 5) ? 5 : selectGenerosRef.current.options.length;
      selectGenerosRef.current.setAttribute('size', cantOpciones);
  }, [generos]);
  useEffect(() => {
    const cantOpciones = (selectPlataformasRef.current.options.length > 5) ? 5 : selectPlataformasRef.current.options.length;
    selectPlataformasRef.current.setAttribute('size', cantOpciones);
  }, [plataformas]);

  useEffect(() => {
    const names = juegos?.map(juego => {
      return juego.nombre;
    })
    setNombres(names);
  }, [juegos]);

  const handleSubmitFiltro = (event) => {
    event.preventDefault();
    let nombre = event.target.elements.nombres.value || '';
    let plataforma = event.target.elements.plataformas.value || null;
    let genero = event.target.elements.generos.value || null;
    let orden = event.target.elements.ordenamiento.value || 'ASC';
    console.log(nombre, plataforma, genero, orden);
    // Llamada a la función de filtrarJuegos con los valores del formulario
    obtenerJuegosFiltados(baseURL, setJuegos, {nombre: nombre, plataforma: plataforma, genero: genero, orden: orden}, setMessage);
  };

  // === Cargar datos a la BD ===
  const handleCargarDatos = () => {
    Promise.all([ cargarData(baseURL, contenedorMensajes, 'generos'), cargarData(baseURL, contenedorMensajes, 'plataformas')])
      .then (() => {
        Promise.all([ cargarData(baseURL, contenedorMensajes, 'juegos')])
          .then(() => { 
            obtenerJuegosFiltados(baseURL, setJuegos, {nombre:'', plataforma: null, genero: null, orden: 'ASC'}, () => {});
            let msj = '';
            contenedorMensajes.forEach(e => { msj += e + '\n'; });
            setMessage(msj);
            contenedorMensajes = [];
          });
        obtenerGeneros(baseURL, setGeneros);
        obtenerPlataformas(baseURL, setPlataformas);
      })
  }
  // === Eliminar juegos de la BD ===
  const handleElimnarDatos = () => {
    Promise.all([ 
      vaciarTabla(baseURL, contenedorMensajes, 'juegos', setJuegos, setGeneros, setPlataformas, setNombres),
      vaciarTabla(baseURL, contenedorMensajes, 'generos', setJuegos, setGeneros, setPlataformas, setNombres),
      vaciarTabla(baseURL, contenedorMensajes, 'plataformas', setJuegos, setGeneros, setPlataformas, setNombres)
    ])
      .then(() => {
          let msj = '';
          contenedorMensajes.forEach(e => { msj += e + '\n'; });
          setMessage(msj);
          contenedorMensajes = [];
      })
  }
	const closeModal = () => {
		setShowModal(false);
    setMessage('');
	}
  useEffect(() => {
    if (message === '') return;
    setShowModal(true);
  }, [message])

  return (
    <>
      <Header />
      {/*Cuerpo de la pagina*/}
      <main className="main">
        {showModal && (
          <div className="modal">
            <div className='contenido-modal'>
              <h2>{message}</h2>
              <div className='btns-modal'>
                <button onClick={() => closeModal()}>Cerrar</button>
              </div>
            </div>
          </div>
          )
        }
        <div className="contenido">
          {/*  Seccion que contiene el aside */}
          <aside className="filtros">
            <h3>Filtros</h3>
            <form id="form-filtro" className="from-filtros" onSubmit={handleSubmitFiltro}> 
              {/* Filtro por nombre */}
              <div className="bloque-filtro-nombre">
                <label htmlFor="nombres" className="titulo-filtro">Por nombre</label>
                <input id="nombres" name="nombres" list="listado-nombres" placeholder= "Hellblade: Senua's Sacrifice"/>
                <datalist id="listado-nombres">
                  {
                    nombres?.map((nombre, idx) => {
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
                <select name="generos" id="generos" title="listado-generos" ref={selectGenerosRef}>
                  <option value="">Ninguna selección</option>
                  {
                    generos?.map((genero, idx) => {
                      return (
                        <option key={idx} value={genero.id}>{genero.nombre}</option>
                      );
                    })
                    
                  }
                </select>
              </div>
              {/* Filtro por plataforma */}
              <div className="bloque-filtro-plataforma">
                <label htmlFor="plataformas" className="titulo-filtro">Por plataforma</label>
                <select name="plataformas" id="plataformas" title="listado-plataformas" ref={selectPlataformasRef}>
                  <option value="">Ninguna selección</option>
                  {
                    plataformas?.map((plataforma, idx) => {
                      return (
                        <option key={idx} value={plataforma.id}>{plataforma.nombre}</option>
                      );
                    })
                    
                  }
                </select>
              </div>
              <div className="ordenamiento_juego">
              {/* Ordenamiento por A-Z */}
              <label htmlFor="ordenamiento" className="titulo-filtro">ordenamiento</label>
              <select name="ordenamiento" id="ordenamiento" title="listado-ordenamientos" size={2}> 
                <option key='1' value="ASC">A - Z</option>
                <option key='2' value="DESC">Z - A</option>
              </select>
            </div>
              <input type="submit" value="Filtrar"></input>
            </form>

            <div className='contenedor-cargar-datos'>
              <h3>Acciones</h3>
              <button value="Cargar Data" onClick={() => handleCargarDatos()}>Cargar Data</button>
              <button value="Eliminar Data" onClick={() => handleElimnarDatos()}>Eliminar Data</button>
            </div>

          </aside>
          {/* Seccion que muestra el contenido */}
          <section className="juegos">
            <div className="bloque-juegos">
            {
              juegos?.map((juego, idx) => {
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
                            plataformas?.find(plataforma => plataforma.id === juego.id_plataforma)?.nombre
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
                            generos?.find(genero => genero.id === juego.id_genero)?.nombre
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