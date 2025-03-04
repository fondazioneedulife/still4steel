import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Pie, PieChart, Cell, LineChart, Line } from 'recharts';
import '../componenti/Widget.css';

type Widget = {
  id: string;
  type: 'entrate' | 'uscite' | 'magazzino' | 'vendite' | 'ordini';
  title: string;
  data: { name: string; value: number }[];
  theme: 'light' | 'dark';
  color: string;
};

type SortableWidgetProps = {
  widget: Widget;
  onRemove?: (id: string) => void;
  onUpdateColor?: (id: string, newColor: string) => void;
  isInModal?: boolean;
};

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
  </svg>
);

const SortableWidget: React.FC<SortableWidgetProps> = ({ widget, onRemove, onUpdateColor, isInModal }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: isInModal });

  const [isDarkMode, setIsDarkMode] = useState(false); // Stato per il tema scuro

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Ferma la propagazione dell'evento
    if (onRemove) {
      onRemove(widget.id);
    }
  };

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Ferma la propagazione dell'evento
    setIsDarkMode(!isDarkMode); // Alterna il tema scuro
  };

  // Funzione per gestire l'inizio del trascinamento
  const handlePointerDown = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest('[data-no-drag]')) {
      return; // Ignora il trascinamento se l'elemento ha l'attributo data-no-drag
    }
    listeners?.onPointerDown?.(event); // Altrimenti, attiva il trascinamento
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!isInModal ? { ...attributes, ...listeners, onPointerDown: handlePointerDown } : {})}
      className={`widget ${widget.theme === 'dark' ? 'widget-dark' : 'widget-light'} ${isDarkMode ? 'widget-dark-mode' : ''}`}
    >
      {/* Icona della luna */}
      {!isInModal && (
        <button
          data-no-drag // Contrassegna l'elemento come non trascinabile
          className="dark-mode-button"
          onClick={toggleDarkMode}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '2.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: isDarkMode ? '#f0f0f0' : '#333', // Colore dell'icona
          }}
        >
          <MoonIcon />
        </button>
      )}

      <h3>{widget.title}</h3>
      {widget.type === 'entrate' || widget.type === 'uscite' ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={widget.color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : widget.type === 'magazzino' ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={widget.data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={widget.color}
                dataKey="value"
                label
              >
                {widget.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={widget.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : widget.type === 'vendite' ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={widget.color} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="widget-content">
          {widget.data.map((item, index) => (
            <div key={index} className="data-item">
              <span className="data-label">{item.name}:</span>
              <span className="data-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {!isInModal && (
        <button
          data-no-drag // Contrassegna l'elemento come non trascinabile
          className="remove-button"
          onClick={handleRemoveClick}
        >
          X
        </button>
      )}
    </div>
  );
};

export default SortableWidget;