import React, { useState, useEffect } from 'react';
import Event from './Event.js';
import './Schedule.css';

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2/24/2023');

  useEffect(() => {
    let url = 'https://adonix.hackillinois.org/event/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
      })
      .catch((error) => {
        console.log('Error fetching event data:', error);
      });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US');
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(2023, 1, 0).getDate();
    const monthName = new Date(2023, 1, 1).toLocaleDateString('en-US', { month: 'long' });
    const calendar = [];

    calendar.push(
      <div key="month" className="calendar-month">
        {monthName}
      </div>
    );

    for (let day = 1; day <= daysInMonth; day++) {
      const dateWithoutEvents = !events.some((event) => {
        const eventDate = formatDate(event.startTime);
        return eventDate === `2/${day}/2023`;
      });

      calendar.push(
        <div
          key={day}
          className={`calendar-day ${selectedDate === `2/${day}/2023` ? 'selected' : ''} ${
            dateWithoutEvents ? 'no-events' : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return calendar;
  };

  const handleDateClick = (day) => {
    const selectedDateString = `2/${day}/2023`;
    setSelectedDate(selectedDateString);
  };

  const filteredEvents = events
    .filter((event) => {
      const eventDate = formatDate(event.startTime);
      return eventDate === selectedDate;
    })
    .sort((a, b) => a.startTime - b.startTime);

  return (
    <div className="schedule-container">
      <div className="calendar">
        {generateCalendar()}
      </div>
      <div className="schedule">
        <ul>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              startTime={event.startTime}
              endTime={event.endTime}
              locations={event.locations}
              points={event.points}
              eventType={event.eventType}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
