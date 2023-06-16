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
import { ajustarSelects } from '../../assets/js/ajustarSelects.js';

// Importacion de datos
import { obtenerGeneros } from '../../components/data/obtenerGeneros.js';

const  DashboardPage = () => {
  const baseURL = 'http://localhost:8000/public';
  const [juegos, setJuegos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [errores, setErrores] = useState([]);
  
  const filtrarJuegos = async (nombre, plataforma, genero, orden) => {
    await axios.get(baseURL + '/juegos', {
      params: {
        nombre: nombre,
        id_plataforma: (plataforma !== '') ? Number(plataforma) : null,
        id_genero: (genero !== '') ? Number(genero) : null,
        orden: orden
      }})
      .then(response => {
        setJuegos(response.data.datos);
      })
      .catch(error => {
        setErrores(error);
      });     
  };
  useEffect(() => {
    const fecthGeneros = async () => {
      await axios.get(baseURL + '/generos')
        .then(response => {
          setGeneros(response.data.datos);
        })
        .catch(error => { // FIXME: No puedo atrar los errores de la api, primero me toma el errore de axios
          setErrores(error);
        });
    };
    const fecthPlataformas = async () => {
      await axios.get(baseURL + '/plataformas')
        .then(response => {
          setPlataformas(response.data.datos);
        })
        .catch(error => {
          setErrores(error);
        });
    };
    filtrarJuegos('', '', '', 'ASC');
    // ---
    Promise.all([fecthGeneros(), fecthPlataformas()])
      .then(() => {
        ajustarSelects();
      });
    // Promise.all -> permite ejecutar varias promesas al mismo tiempo
      // .then -> se ejecuta cuando todas las promesas se resuelven
      // Esto nos garantiza que los estados generos y plataformas ya hayan sido actualizados antes de llamar a ajustarSelects().
  }, []); 

  // === Evento envio del formulario ===
  const handleSubmitFiltro = (event) => {
    event.preventDefault();
    
    let nombre = event.target.elements.nombres.value;
    let plataforma = event.target.elements.plataformas.value;
    let genero = event.target.elements.generos.value;
    let orden = event.target.elements.ordenamiento.value;
    
    // Llamada a la función de filtrarJuegos con los valores del formulario
    filtrarJuegos(nombre, plataforma, genero, orden);
  };

  return (
    <>
      <Header />
      {/*Cuerpo de la pagina*/}
      <main class="main">
        <div class="contenido">
          {/*  Seccion que contiene los filtors del contenido */}
          <aside class="filtros">
            <h3>Filtros</h3>
            <form id="form-filtro" class="from-filtros" onSubmit={handleSubmitFiltro}> 
              {/* Filtro por nombre */}
              <div class="bloque-filtro-nombre">
                <label for="nombres" class="titulo-filtro">Por nombre</label>
                <input id="nombres" name="nombres" list="listado-nombres" />
                <datalist id="nombres">
                  {/* <?php require_once('components/includes/opciones_nombres.php')?> */}
                </datalist>
              </div>
              {/* Filtro por genero */}
              <div class="bloque-filtro-genero">
                <label for="generos" class="titulo-filtro">Por Genero</label>
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
              <div class="bloque-filtro-plataforma">
                <label for="plataformas" class="titulo-filtro">Por plataforma</label>
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
              <div class="ordenamiento_juego">
              {/* Ordenamiento por A-Z */}
              <label for="ordenamiento" class="titulo-filtro">ordenamiento</label>
              <select name="ordenamiento" id="ordenamiento" title="listado-ordenamientos"> 
                <option value="ASC">A - Z</option>
                <option value="DESC">Z - A</option>
              </select>
            </div>
              <input type="submit" value="Filtrar"></input>
            </form>
          </aside>
          {/* Seccion que muestra el contenido */}
          <section class="juegos">
            <div class="bloque-juegos">
            {
              juegos.map(juego => {
                return (
                  <div class='juego' id={juego.nombre}>
                    <div class="header-juego">
                      <img src={`data:${juego.tipo_imagen};base64,${juego.imagen}`} alt={`Portada del ${juego.nombre}`} loading="lazy" />
                    </div>
                    <div class="contenido-juego">
                      <div class="contenedor-titulo-juego">
                        <p class="titulo-juego">{juego.nombre}</p>
                        <div class="subrallado"></div>
                      </div>
                      <p class="descripcion-juego">{juego.descripcion}</p>
                      <div>
                        <p class="contenido-subtitulo">plataforma</p>
                        <ul class="plataformas-juego">
                          <li>{
                            plataformas.map (plataforma => {
                              if (plataforma.id == juego.id_plataforma) {
                                return plataforma.nombre;
                              }
                            })
                          }</li>
                        </ul>
                      </div>
                      <div>
                        <p class="url-juego contenido-subtitulo">pagina oficial</p>
                        <ul class="url-juego">
                          <li class="url">
                            <a href={juego.url} target='_blank'>{juego.url}</a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p class="contenido-subtitulo">genero</p>
                        <ul class="generos-juego">
                          <li>{
                            generos.map (genero => {
                              if (genero.id == juego.id_genero) {
                                return genero.nombre;
                              }
                            })
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