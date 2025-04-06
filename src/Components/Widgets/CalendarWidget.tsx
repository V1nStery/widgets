import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { Widget } from '../types';

interface CalendarWidgetProps {
  widget: Widget;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ widget }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="p-4">
      {widget.data.settings?.showTitle && (
        <h3 className="text-xl font-semibold mb-4">{widget.data.title}</h3>
      )}
      <div className="overflow-x-auto">
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </div>
  );
};

export default CalendarWidget; 