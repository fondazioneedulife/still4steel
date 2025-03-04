import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableWidget from '../componenti/SortableWidget';
import { Widget } from '../Types/types';
import '../componenti/Widget.css'; 

// Lista di widget disponibili
const availableWidgets: Widget[] = [
  {
    id: 'widget-1',
    type: 'entrate',
    title: 'Entrate Mensili',
    data: [
      { name: 'Gen', value: 10000 },
      { name: 'Feb', value: 12000 },
      { name: 'Mar', value: 8000 },
    ],
    theme: 'light', 
    color: '#8884d8',
  },
  {
    id: 'widget-2',
    type: 'uscite',
    title: 'Uscite Annuali',
    data: [
      { name: 'Gen', value: 5000 },
      { name: 'Feb', value: 6000 },
      { name: 'Mar', value: 4000 },
    ],
    theme: 'dark',
    color: '#82ca9d', 
  },
  {
    id: 'widget-3',
    type: 'magazzino',
    title: 'Stato Magazzino',
    data: [
      { name: 'Disponibile', value: 120 },
      { name: 'In Arrivo', value: 50 },
      { name: 'Esaurito', value: 10 },
    ],
    theme: 'light',
    color: '#FF8042', 
  },
  {
    id: 'widget-4',
    type: 'vendite',
    title: 'Vendite Giornaliere',
    data: [
      { name: 'Lun', value: 200 },
      { name: 'Mar', value: 300 },
      { name: 'Mer', value: 400 },
      { name: 'Gio', value: 350 },
      { name: 'Ven', value: 500 },
    ],
    theme: 'dark',
    color: '#0088FE', 
  },
  {
    id: 'widget-5',
    type: 'ordini',
    title: 'Stato Ordini',
    data: [
      { name: 'In Attesa', value: 15 },
      { name: 'Spediti', value: 30 },
      { name: 'Consegnati', value: 55 },
    ],
    theme: 'light',
    color: '#FFBB28', 
  },
];

// Home
const Home: React.FC = () => {
  const [homeWidgets, setHomeWidgets] = useState<Widget[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeWidget, setActiveWidget] = useState<Widget | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null); // Stato per il widget selezionato

  // Sensori per il drag & drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  // Genera un ID univoco per i widget nella home
  const generateUniqueId = (baseId: string) => `${baseId}-${Date.now()}`;

  // Inizia il drag
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const widget = availableWidgets.find((w) => w.id === active.id) || homeWidgets.find((w) => w.id === active.id);
    if (widget) {
      setActiveWidget(widget);
    }
  };

  // Termina il drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveWidget(null); // Resetta il widget attivo

    if (!over) return;

    if (!homeWidgets.some((w) => w.id === active.id)) {
      // Se il widget viene trascinato nella home dalla lista dei disponibili
      const widgetToAdd = availableWidgets.find((w) => w.id === active.id);
      if (widgetToAdd) {
        const newWidget = {
          ...widgetToAdd,
          id: generateUniqueId(widgetToAdd.id),
        };
        setHomeWidgets([...homeWidgets, newWidget]);
      }
    } else {
      // Se il widget viene riordinato all'interno della home
      const activeIndex = homeWidgets.findIndex((w) => w.id === active.id);
      const overIndex = homeWidgets.findIndex((w) => w.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newWidgets = arrayMove(homeWidgets, activeIndex, overIndex);
        setHomeWidgets(newWidgets);
      }
    }
  };

  // Rimuove un widget dalla home
  const handleRemoveWidget = (id: string) => {
    setHomeWidgets(homeWidgets.filter((widget) => widget.id !== id));
  };

  // Aggiorna il colore di un widget
  const handleUpdateColor = (id: string, newColor: string) => {
    setHomeWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, color: newColor } : widget
      )
    );
  };

  // Alterna la visibilità della modale
  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedWidgetId(null); // Resetta il widget selezionato quando la modale viene chiusa
  };

  // Gestisce il clic su un widget nel popup
  const handleWidgetClick = (id: string) => {
    setSelectedWidgetId(id); // Imposta il widget selezionato
  };

  // Aggiunge il widget selezionato alla home
  const handleAddWidget = () => {
    if (selectedWidgetId) {
      const widgetToAdd = availableWidgets.find((w) => w.id === selectedWidgetId);
      if (widgetToAdd && !homeWidgets.some((w) => w.type === widgetToAdd.type)) {
        const newWidget = {
          ...widgetToAdd,
          id: generateUniqueId(widgetToAdd.id),
        };
        setHomeWidgets([...homeWidgets, newWidget]);
        setSelectedWidgetId(null); // Resetta il widget selezionato
        setShowModal(false); // Chiudi la modale
      } else {
        alert('Questo widget è già stato aggiunto.');
      }
    }
  };

  // Simula l'aggiornamento automatico dei dati
  useEffect(() => {
    const interval = setInterval(() => {
      setHomeWidgets((prevWidgets) =>
        prevWidgets.map((widget) => ({
          ...widget,
          data: widget.data.map((item) => ({
            ...item,
            value: item.value + Math.floor(Math.random() * 10), 
          })),
        }))
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container className="mt-4">
        <h1></h1>
        <Button variant="dark" style={{ fontWeight: '900' }} onClick={toggleModal}>
          +
        </Button>

        {/* Zona droppabile della Home */}
        <div
          className="mt-3 droppable-area"
        >
          <SortableContext items={homeWidgets} strategy={verticalListSortingStrategy}>
            <Row>
              {homeWidgets.map((widget) => (
                <Col key={widget.id} xs={12} md={6} className="mb-3">
                  <SortableWidget
                    widget={widget}
                    onRemove={handleRemoveWidget}
                    onUpdateColor={handleUpdateColor}
                  />
                </Col>
              ))}
            </Row>
          </SortableContext>
        </div>

        {/* Overlay per il widget trascinato */}
        <DragOverlay>
          {activeWidget ? <SortableWidget widget={activeWidget} /> : null}
        </DragOverlay>

        {/* Modale per i widget disponibili */}
        <Modal show={showModal} onHide={toggleModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Widget Disponibili</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {availableWidgets.map((widget) => (
                <Col key={widget.id} xs={12} md={6} className="mb-3">
                  <div
                    className={`widget-container ${selectedWidgetId === widget.id ? 'selected-widget' : ''}`}
                    onClick={() => handleWidgetClick(widget.id)}
                  >
                    
                    <SortableWidget widget={widget} isInModal />
                  </div>
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={handleAddWidget} disabled={!selectedWidgetId}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DndContext>
  );
};

export default Home;