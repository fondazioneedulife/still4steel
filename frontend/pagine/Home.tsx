import React, { useState } from 'react';
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
  },
  {
    id: 'widget-3',
    type: 'stato-spedizioni',
    title: 'Stato Spedizioni',
    data: [
      { name: 'In Transito', value: 12 },
      { name: 'Consegnate', value: 20 },
      { name: 'In Attesa', value: 5 },
    ],
  },
  {
    id: 'widget-4',
    type: 'spedizioni-transito',
    title: 'Spedizioni in Transito',
    data: [{ name: 'Totale', value: 12 }],
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

  // Aggiorna i dati di un widget
  const handleUpdateValue = (id: string, newData: { name: string; value: number }[]) => {
    setHomeWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, data: newData } : widget
      )
    );
  };

  // Alterna la visibilità della modale
  const toggleModal = () => setShowModal(!showModal);

  // Gestisce il clic su un widget nel popup
  const handleWidgetClick = (id: string) => {
    setSelectedWidgetId(id); // Imposta il widget selezionato
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container className="mt-4">
        <h1>Dashboard Aziendale</h1>
        <Button variant="primary" onClick={toggleModal}>
          Mostra Widget Disponibili
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
                    onUpdateValue={handleUpdateValue}
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
                    className={`widget ${selectedWidgetId === widget.id ? 'selected-widget' : ''}`}
                    onClick={() => handleWidgetClick(widget.id)}
                  >
                    <SortableWidget widget={widget} />
                  </div>
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DndContext>
  );
};

export default Home;