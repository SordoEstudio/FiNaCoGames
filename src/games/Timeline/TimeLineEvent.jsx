// src/components/TimelineEvent.js
import React from 'react';
import './TimelineEvent.css'; // Añadimos un archivo de estilo para los eventos

const TimelineEvent = ({ event }) => {
  return (
    <div className="timeline-event">
      <div className="timeline-date">{event.date}</div>
      <div className="timeline-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default TimelineEvent;
