import React from 'react';

const CalendarEmbed: React.FC = () => {
  const calendarSrc = process.env.REACT_APP_GOOGLE_CALENDAR_SRC;

  return (
    <iframe
      src={calendarSrc}
      style={{ border: 0 }}
      width="800"
      height="600"
    ></iframe>
  );
};

export default CalendarEmbed;
