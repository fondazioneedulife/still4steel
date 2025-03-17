import React from 'react';

type CalendarControlsProps = {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentDate: Date;
  disabled?: boolean;
};

const CalendarControls: React.FC<CalendarControlsProps> = ({
  onPrevMonth,
  onNextMonth,
  currentDate,
  disabled
}) => {
  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div 
      className="calendar-controls"
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      onClick={stopPropagation}
      style={{ position: 'relative', zIndex: 9999 }}
    >
      <button 
        onClick={(e) => {
          stopPropagation(e);
          onPrevMonth();
        }}
        disabled={disabled}
      >⬅️</button>
      <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
      <button
        onClick={(e) => {
          stopPropagation(e);
          onNextMonth();
        }}
        disabled={disabled}
      >➡️</button>
    </div>
  );
};

export default CalendarControls;