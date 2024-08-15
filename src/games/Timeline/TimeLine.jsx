import React, { useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import './TimeLine.css'; // Agrega un archivo CSS para los estilos
export default function TimeLine() {
  const [events, setEvents] = useState([
    { id: 1, name: 'Fundación de la Ciudad', year: 1850 },
    { id: 2, name: 'Construcción del Puente Histórico', year: 1900 },
    { id: 3, name: 'Inauguración del Museo Local', year: 1950 },
    { id: 4, name: 'Celebración del Centenario', year: 2000 },
  ]);

  const [timeline, setTimeline] = useState(Array(events.length).fill(null));

  const handleDrop = (eventId, index) => {
    const newTimeline = [...timeline];
    newTimeline[index] = events.find(event => event.id === eventId);
    setTimeline(newTimeline);
  };

  return (
    <div className="timeline-game">
      <h2>Línea de Tiempo</h2>
      <div className="timeline">
        <Timeline>
          {timeline.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent>10:00</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div
                  className="timeline-slot"
                  onDrop={(e) => {
                    const eventId = parseInt(e.dataTransfer.getData('eventId'), 10);
                    handleDrop(eventId, index);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {event ? event.name : 'Suelta aquí'}
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div className="events">
        {events.map(event => (
          <div
            key={event.id}
            className="event"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('eventId', event.id)}
          >
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
}
