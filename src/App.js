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
import EditOpcion from './pages/EditPage';
import NewOpcion from './pages/NewPage';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/generos" element={<Generos />} />
        <Route exact path="/generos/new" element={<NewOpcion />} />
        <Route exact path="/generos/edit/:alias" element={<EditOpcion />} />
        <Route exact path="/plataformas" element={<Plataformas />} />
        <Route exact path="/plataformas/edit/:alias" element={<EditOpcion />} />
        <Route exact path="/plataformas/new" element={<NewOpcion />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
