import { useState } from 'react';
import { Modal, Button, Form, Row, Container, Col } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendario.css';

const Calendario: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // Stato per gli eventi
  const [showModal, setShowModal] = useState<boolean>(false); // Stato per il popup
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    allDay: false,
    start: '',
    end: '',
  });

  // Apre il popup per aggiungere un evento
  const handleAddEvent = () => {
    setShowModal(true);
  };

  // Chiude il popup
  const handleCloseModal = () => {
    setShowModal(false);
    setNewEvent({ title: '', location: '', allDay: false, start: '', end: '' });
  };

  // Gestisce il salvataggio di un nuovo evento
  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      handleCloseModal();
    }
  };

  // Gestisce il drag and drop degli eventi
  const handleEventDrop = (eventInfo: any) => {
    const updatedEvents = events.map((ev) =>
      ev.id === eventInfo.event.id
        ? { ...ev, start: eventInfo.event.start, end: eventInfo.event.end }
        : ev
    );
    setEvents(updatedEvents);
  };

  return (
    <Container className="calendario-page">
      {/* Titolo della pagina */}
      <h1 className="page-title">Calendario</h1>

      {/* Sezione principale */}
      <Row>
        {/* Calendario */}
        <Col md={9}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            editable={true}
            eventDrop={handleEventDrop}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            themeSystem="standard"
          />
        </Col>

        {/* Sezione per aggiungere eventi */}
        <Col md={3} className="add-event-section">
          <Button variant="dark" onClick={handleAddEvent} className="add-event-button">
            +
          </Button>
        </Col>
      </Row>

      {/* Popup per aggiungere un evento */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome Evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome dell'evento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il luogo"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
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
            <Form.Group className="mb-3">
              <Form.Label>Data e Ora di Inizio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data e Ora di Fine</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Calendario;