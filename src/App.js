// Importaciones de librerias
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Imp
import './App.css';

// Importaciones de paginas
import Dashboard from './pages/dashboard/DashboardPage';
import Generos from './pages/generos/GenerosPage';
import Plataformas from './pages/plataformas/PlataformasPage';
import NoPage from './pages/NoPage';

// Importacion de acciones en paginas
import EditGenero from './pages/generos/EditPage';
import EditPlataforma from './pages/plataformas/EditPage';
import NewGenero from './pages/generos/NewPage';
import NewPlataforma from './pages/plataformas/NewPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        {/* <Route exact path="/generos" element={<Generos />} />
        <Route exact path="/plataformas" element={<Plataformas />} />
        <Route exact path="/generos/edit/:id" element={<EditGenero />} />
        <Route exact path="/plataformas/edit/:id" element={<EditPlataforma />} />
        <Route exact path="/generos/new" element={<NewGenero />} />
        <Route exact path="/plataformas/new" element={<NewPlataforma />} /> */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
