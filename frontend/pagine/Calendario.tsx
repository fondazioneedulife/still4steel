import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Calendario.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Calendario: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    color: '#000000',
    start: '',
    end: '',
    allDay: false,
  });

  const handleDateClick = (arg: any) => {
    setNewEvent({
      ...newEvent,
      start: arg.dateStr,
      end: arg.dateStr,
    });
    setShowModal(true);
  };

  const handleEventDrop = (arg: any) => {
    const updatedEvents = events.map((event) => {
      if (event.title === arg.event.title) {
        return { ...event, start: arg.event.startStr, end: arg.event.endStr };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start) {
      setEvents([...events, newEvent]);
      setShowModal(false);
      setNewEvent({
        title: '',
        color: '#000000',
        start: '',
        end: '',
        allDay: false,
      });
    }
  };

  return (
    <div className="container mt-5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        themeSystem="bootstrap5"
        events={events}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        editable={true}
        droppable={true}
        eventContent={(eventInfo) => (
          <div style={{ backgroundColor: eventInfo.event.backgroundColor, color: '#fff', padding: '2px', borderRadius: '3px' }}>
            {eventInfo.event.title}
          </div>
        )}
      />

      {/* Modal per aggiungere eventi */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome dell'evento</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Colore</Form.Label>
              <Form.Control
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data e Ora</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Tutto il giorno"
                checked={newEvent.allDay}
                onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button onClick={handleSaveEvent}>
            Salva Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendario;