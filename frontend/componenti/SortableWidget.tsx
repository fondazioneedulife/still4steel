import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../componenti/Widget.css'; 

type Widget = {
  id: string;
  type: 'entrate' | 'uscite' | 'stato-spedizioni' | 'spedizioni-transito'; 
  title: string; 
  data: { name: string; value: number }[]; 
};

type SortableWidgetProps = {
  widget: Widget;
  onRemove?: (id: string) => void;
  onUpdateValue?: (id: string, newData: { name: string; value: number }[]) => void; // Callback per aggiornare i dati
};

const SortableWidget: React.FC<SortableWidgetProps> = ({ widget, onRemove, onUpdateValue }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const [localData, setLocalData] = useState(widget.data); // Stato locale per i dati

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? 'scale(0.95)' : 'scale(1)',
  };

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onRemove) {
      onRemove(widget.id);
    }
  };

  const handleUpdateData = () => {
    const newValue = parseFloat(prompt('Inserisci un nuovo valore:', localData[0].value.toString()) || localData[0].value.toString());
    if (!isNaN(newValue)) {
      const updatedData = localData.map((item) => ({ ...item, value: newValue }));
      setLocalData(updatedData);
      if (onUpdateValue) {
        onUpdateValue(widget.id, updatedData);
      }
    } else {
      alert('Inserisci un valore numerico valido.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="widget">
        <h3>{widget.title}</h3>
        {widget.type === 'entrate' ? (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={localData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="widget-content">
            {localData.map((item, index) => (
              <div key={index} className="data-item">
                <span className="data-label">{item.name}:</span>
                <span className="data-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleUpdateData}
          className="update-button"
        >
          Aggiorna Dati
        </button>
      </div>
      {onRemove && (
        <button
          className="remove-button"
          onClick={handleRemoveClick}
         
        > X
        </button>
      )}
    </div>
  );
};

export default SortableWidget;