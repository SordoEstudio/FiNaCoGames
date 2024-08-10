// src/pages/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );
};

export default ErrorPage;
