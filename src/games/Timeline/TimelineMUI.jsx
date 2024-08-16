import React, { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
  timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import "./TimeLineMUI.css"; // Import the CSS file

export default function TimeLineMUI( {score, setScore, endGame} ) {
  const [events, setEvents] = useState([
    { id: 1, name: "Fundación de la Ciudad", year: 1850 },
    { id: 2, name: "Construcción del Puente Histórico", year: 1900 },
    { id: 3, name: "Inauguración del Museo Local", year: 1950 },
    { id: 4, name: "Celebración del Centenario", year: 2000 },
  ]);

  const [timeline, setTimeline] = useState(Array(events.length).fill(null));
  const [dropStates, setDropStates] = useState(Array(events.length).fill(null)); // null, 'correct', 'incorrect'

  useEffect(() => {
    if (timeline.every((item) => item !== null)) {
      endGame();
    }
  }, [timeline]);

  const handleDrop = (eventId, index) => {
    const event = events.find((e) => e.id === eventId);
    if (event && event.year === events[index].year) {
      const newTimeline = [...timeline];
      newTimeline[index] = event;
      setTimeline(newTimeline);
      setScore(score + 1);
      const newEvents = events.map((e) =>
        e.id === eventId ? { ...e, isPlaced: true } : e
      );
      setEvents(newEvents);

      const newDropStates = [...dropStates];
      newDropStates[index] = "correct";
      setDropStates(newDropStates);
    } else {
      const newDropStates = [...dropStates];
      newDropStates[index] = "incorrect";
      setDropStates(newDropStates);

      setTimeout(() => {
        const resetDropStates = [...dropStates];
        resetDropStates[index] = null;
        setDropStates(resetDropStates);
      }, 1000); // 1 second
    }
  };

  return (
    <div className="timeline-game">
      <div className="events">
        {events.map((event) => (
          <div
            key={event.id}
            className={`event ${event.isPlaced ? "isPlaced" : ""}`} // Conditional class
            draggable={!event.isPlaced} // Disable dragging if the event is placed
            onDragStart={(e) => e.dataTransfer.setData("eventId", event.id)}
          >
            {event.name}
          </div>
        ))}
      </div>

      <Timeline
        sx={{
          width: "70%",
          padding: "10px",
          [`& .${timelineContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {events.map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineOppositeContent color="textSecondary">
              <div
                className={`timeline-slot ${dropStates[index]}`} // Use the state as a class
                onDrop={(e) => {
                  const eventId = parseInt(
                    e.dataTransfer.getData("eventId"),
                    10
                  );
                  handleDrop(eventId, index);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {timeline[index] ? timeline[index].name : "Suelta aquí"}
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{event.year}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
