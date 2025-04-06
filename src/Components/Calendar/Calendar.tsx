import React from 'react';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth
}) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Преобразуем для недели, начинающейся с понедельника
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('ru-RU', { month: 'long' });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && 
                          today.getFullYear() === currentDate.getFullYear();

    const weeks = [];
    let days = [];
    let day = 1;

    // Добавляем пустые ячейки в начале месяца
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="p-2 border border-gray-300 text-sm"></td>);
    }

    // Добавляем дни месяца
    while (day <= daysInMonth) {
      const isToday = isCurrentMonth && today.getDate() === day;
      const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
      const isWeekend = dayOfWeek > 4;

      days.push(
        <td
          key={day}
          className={`
            p-2 border border-gray-300 text-sm text-center cursor-pointer
            ${isWeekend ? 'bg-red-50 text-red-800' : ''}
            ${isToday ? 'bg-blue-500 text-black font-bold' : 'hover:bg-gray-50'}
            transition-colors duration-200
          `}
          onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          {day}
        </td>
      );

      if (days.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
        days = [];
      }

      day++;
    }

    // Добавляем пустые ячейки в конце месяца
    while (days.length > 0 && days.length < 7) {
      days.push(
        <td key={`empty-end-${days.length}`} className="p-2 border border-gray-300 text-sm"></td>
      );
    }

    if (days.length > 0) {
      weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
    }

    return weeks;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 w-10 h-10 flex items-center justify-center text-gray-800 hover:text-black text-xl shadow-md"
        >
          ←
        </button>
        <h3 className="text-xl font-semibold text-gray-800">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 w-10 h-10 flex items-center justify-center text-gray-800 hover:text-black text-xl shadow-md"
        >
          →
        </button>
      </div>
      <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <th key={day} className="p-2 border border-gray-300 text-sm font-medium bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar; 