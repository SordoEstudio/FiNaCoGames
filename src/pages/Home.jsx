// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa el archivo CSS para los estilos

const Home = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: 'Línea de Tiempo',
      description: 'Organiza los eventos históricos en el orden correcto.',
      image: '/images/timeline.jpg', // Ruta a la imagen
      color: '#ff6f61',
      route: '/rules/timeline',
    },
    {
      title: 'Juego de Memoria',
      description: 'Encuentra las parejas de imágenes relacionadas con la localidad.',
      image: '/images/memory.jpg', // Ruta a la imagen
      color: '#6b5b95',
      route: '/rules/memory-pairs',
    },
    {
      title: 'Unir Parejas',
      description: 'Asocia correctamente las parejas relacionadas con la historia local.',
      image: '/images/matching.jpg', // Ruta a la imagen
      color: '#88b04b',
      route: '/rules/matching-pairs',
    },
    {
      title: 'Trivia',
      description: 'Reponde las preguntas sobre San Vicente y suma puntos',
      image: '/images/trivia.jpg', // Ruta a la imagen
      color: '#88664b',
      route: '/rules/questions',
    }
    ];

  return (
    <div className="home">
      <h1>Bienvenido a los Juegos Educativos</h1>
      <div className="card-container">
        {games.map((game, index) => (
          <div
            key={index}
            className="game-card"
            style={{ backgroundColor: game.color }}
            onClick={() => navigate(game.route)}
          >
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="card-content">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
