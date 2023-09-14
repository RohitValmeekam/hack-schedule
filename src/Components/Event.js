import React from 'react';
import './Event.css';

export default function Event({ id, name, description, startTime, endTime, locations, points, eventType }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
  };

  points = points || 0;

  return (
    <div className="event-container">
      <div className="event">
        <div className="event-header">
          <div className="first-row">
            <h3>{formatTime(startTime)}</h3>
            <h2>{name}{eventType !== "OTHER" ?  " - " + eventType : ""}</h2>
          </div>
          <div className="event-points">
            <p>Points: {points}</p>
          </div>
          <p className="event-time">
            {formatTime(startTime)} - {formatTime(endTime)}
          </p>
        </div>
        <p className="event-description">{description}</p>
        {locations &&
          locations.map((location, index) => (
            <p key={index} className="event-location">
              Location {index + 1}: {location.description}
            </p>
          ))}
      </div>
    </div>
  );
}
