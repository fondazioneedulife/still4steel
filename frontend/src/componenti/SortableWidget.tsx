import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line
} from 'recharts';
import './Widget.css';
import React from 'react';

type Event = {
  date: string;
  title: string;
};

type Widget = {
  id: string;
  type: 'utenti' | 'vendite' | 'magazzino' | 'dipendenti' | 'fatturato' | 'ordini-pendenti' | 'clienti-attivi' | 'spese-aziendali' | 'prodotti-piu-venduti' | 'calendar' | 'calcolatrice' | 'tasklist' | 'notes' | 'customer-trend';
  title: string;
  data: { name: string; value: number }[] | Event[];
  theme: 'light' | 'dark';
  color: string;
};

type SortableWidgetProps = {
  widget: Widget;
  onRemove?: (id: string) => void;
  isInModal?: boolean;
  onThemeToggle?: (id: string) => void;
};

const CalculatorWidget: React.FC<{ value: string; onButtonClick: (value: string) => void; disabled?: boolean }> = ({ value, onButtonClick, disabled }) => (
  <div className="calculator">
    <input type="text" value={value} readOnly />
    <div className="calculator-buttons">
      {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((btn) => (
        <button key={btn} onClick={() => !disabled && onButtonClick(btn)} disabled={disabled}>
          {btn}
        </button>
      ))}
    </div>
  </div>
);

const SimpleCalendarWidget: React.FC<{ events: Event[]; onAddEvent: (event: Event) => void; disabled?: boolean }> = ({ events, onAddEvent, disabled }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (date: string) => {
    if (!disabled) setSelectedDate(date);
    setNewEventTitle('');
  };

  const handleAddEvent = () => {
    if (selectedDate && newEventTitle.trim() && !disabled) {
      onAddEvent({ date: selectedDate, title: newEventTitle });
      setSelectedDate(null);
      setNewEventTitle('');
    }
  };

  const changeMonth = (offset: number) => {
    if (disabled) return;
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthDates: never[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    monthDates.push(null as never);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
    monthDates.push(date as never);
  }

  return (
    <div className="simple-calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} disabled={disabled}>⬅️</button>
        <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
        <button onClick={() => changeMonth(1)} disabled={disabled}>➡️</button>
      </div>
      <div className="calendar-grid">
        {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {monthDates.map((date, index) => (
          <div
            key={index}
            className={`calendar-date ${date ? '' : 'empty'} ${selectedDate === date ? 'selected' : ''}`}
            onClick={() => date && handleDateClick(date)}
          >
            {date ? new Date(date).getDate() : ''}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="calendar-event-form">
          <h4>Aggiungi evento per il {selectedDate}</h4>
          <input
            type="text"
            placeholder="Titolo evento"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            disabled={disabled}
          />
          <button onClick={handleAddEvent} disabled={disabled}>Aggiungi Evento</button>
        </div>
      )}
      <div className="events-list">
        {events
          .filter((event) => event.date.startsWith(currentDate.toISOString().split('T')[0].slice(0, 7)))
          .map((event, index) => (
            <div key={index} className="event-item">
              <strong>{event.date}</strong>: {event.title}
            </div>
          ))}
      </div>
    </div>
  );
};

const NotesWidget: React.FC<{ note: string; onNoteChange: (value: string) => void; disabled?: boolean }> = ({ note, onNoteChange, disabled }) => (
  <textarea
    className="notes-textarea"
    value={note}
    onChange={(e) => !disabled && onNoteChange(e.target.value)}
    placeholder="Scrivi le tue note qui..."
    disabled={disabled}
  />
);

const TaskListWidget: React.FC<{ tasks: string[]; onAddTask: (task: string) => void; onRemoveTask: (index: number) => void; disabled?: boolean }> = ({ tasks, onAddTask, onRemoveTask, disabled }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() && !disabled) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="tasklist-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Aggiungi una task..."
        disabled={disabled}
      />
      <button onClick={handleAddTask} disabled={disabled}>Aggiungi</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => !disabled && onRemoveTask(index)} disabled={disabled}>Rimuovi</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SortableWidget: React.FC<SortableWidgetProps> = ({ widget, onRemove, isInModal }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id, disabled: isInModal });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  const [note, setNote] = useState(widget.type === 'notes' && widget.data[0] && 'title' in widget.data[0] ? widget.data[0].title : '');
  const [tasks, setTasks] = useState<string[]>([]);
  const [calcValue, setCalcValue] = useState('');
  const [events, setEvents] = useState<Event[]>(widget.type === 'calendar' ? (widget.data as Event[]) : []);

  const handleNoteChange = (value: string) => {
    if (!isInModal) setNote(value);
  };

  const handleAddTask = (task: string) => {
    if (!isInModal) setTasks([...tasks, task]);
  };

  const handleRemoveTask = (index: number) => {
    if (!isInModal) setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleCalcButtonClick = (value: string) => {
    if (isInModal) return; // Disabilita la calcolatrice nel modale

    if (value === 'C') {
      setCalcValue('');
    } else if (value === '=') {
      try {
        setCalcValue(eval(calcValue).toString());
      } catch {
        setCalcValue('Errore');
      }
    } else {
      setCalcValue(calcValue + value);
    }
  };

  const handleAddEvent = (event: Event) => {
    if (!isInModal) setEvents([...events, event]);
  };

  const [isDark, setIsDark] = useState(widget.theme === 'dark');

  const toggleTheme = (e: React.MouseEvent) => {
    if (isInModal) return; // Disabilita il cambio tema nel modale
    e.stopPropagation();
    e.preventDefault();
    setIsDark(!isDark);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`widget ${isDark ? 'widget-dark' : 'widget-light'}`}
    >
      <div className="widget-header">
        <h3>{widget.title}</h3>
        <div className="widget-controls">
          {!isInModal && (
            <>
              <button 
                className="theme-toggle" 
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleTheme(e);
                }}
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button 
                className="remove-widget" 
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onRemove && onRemove(widget.id);
                }}
                aria-label="Remove widget"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
      <div className="chart-container" onClick={(e) => e.stopPropagation()}>
        {widget.type === 'calendar' ? (
          <SimpleCalendarWidget events={events} onAddEvent={handleAddEvent} disabled={isInModal} />
        ) : widget.type === 'notes' ? (
          <NotesWidget note={note} onNoteChange={handleNoteChange} disabled={isInModal} />
        ) : widget.type === 'tasklist' ? (
          <TaskListWidget tasks={tasks} onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} disabled={isInModal} />
        ) : widget.type === 'calcolatrice' ? (
          <CalculatorWidget value={calcValue} onButtonClick={handleCalcButtonClick} disabled={isInModal} />
        ) : ['utenti', 'vendite', 'customer-trend'].includes(widget.type) ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={widget.data as { name: string; value: number }[]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke={widget.color} />
            </LineChart>
          </ResponsiveContainer>
        ) : ['magazzino', 'dipendenti'].includes(widget.type) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={widget.data as { name: string; value: number }[]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill={widget.color} />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  );
};

// Add this CSS to your Widget.css file:
export default SortableWidget;