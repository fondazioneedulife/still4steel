import React, { useState } from 'react';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableWidget from '../componenti/SortableWidget';
import { Widget } from '../../Types/types';
import '../componenti/Widget.css';
import LeftNavbar from '../componenti/NavbarDesktop';
import NavFooter from '../componenti/NavFooter';

const availableWidgets: Widget[] = [
  {
    id: 'widget-1',
    type: 'utenti',
    title: 'Nuovi Utenti Mensili',
    data: [
      { name: 'Gen', value: 120 },
      { name: 'Feb', value: 150 },
      { name: 'Mar', value: 200 },
    ],
    theme: 'light',
    color: '#8884d8',
  },
  {
    id: 'widget-2',
    type: 'vendite',
    title: 'Vendite Annuali',
    data: [
      { name: 'Gen', value: 50000 },
      { name: 'Feb', value: 60000 },
      { name: 'Mar', value: 70000 },
    ],
    theme: 'light',
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
    type: 'dipendenti',
    title: 'Produttività Dipendenti',
    data: [
      { name: 'Lun', value: 80 },
      { name: 'Mar', value: 90 },
      { name: 'Mer', value: 85 },
      { name: 'Gio', value: 95 },
      { name: 'Ven', value: 100 },
    ],
    theme: 'light',
    color: '#0088FE',
  },
  {
    id: 'widget-8',
    type: 'calcolatrice',
    title: 'Calcolatrice',
    data: [],
    theme: 'light',
    color: '#82ca9d',
  },
  {
    id: 'widget-9',
    type: 'tasklist',
    title: 'Tasklist',
    data: [],
    theme: 'light',
    color: '#0088FE',
  },
  {
    id: 'widget-10',
    type: 'notes',
    title: 'Notes',
    data: [{ start: new Date(), end: new Date(), title: '' }],
    theme: 'light',
    color: '#FFBB28',
  },
  {
    id: 'widget-13',
    type: 'customer-trend',
    title: 'Andamento Clienti',
    data: [
      { name: 'Gen', value: 120 },
      { name: 'Feb', value: 150 },
      { name: 'Mar', value: 200 },
    ],
    theme: 'light',
    color: '#8884d8',
  },
  {
    id: 'widget-16',
    type: 'calendar',
    title: 'Calendario',
    data: [],
    theme: 'light',
    color: '#82ca9d',
  },
];
const Home: React.FC = () => {
  const [homeWidgets, setHomeWidgets] = useState<Widget[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeWidget, setActiveWidget] = useState<Widget | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const generateUniqueId = () => {
    return `widget-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const widget = availableWidgets.find((w) => w.id === active.id) || homeWidgets.find((w) => w.id === active.id);
    if (widget) {
      setActiveWidget(widget);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveWidget(null);

    if (!over) return;

    if (!homeWidgets.some((w) => w.id === active.id)) {
      const widgetToAdd = availableWidgets.find((w) => w.id === active.id);
      if (widgetToAdd) {
        const newWidget = {
          ...widgetToAdd,
          id: generateUniqueId(),
        };
        setHomeWidgets([...homeWidgets, newWidget]);
      }
    } else {
      const activeIndex = homeWidgets.findIndex((w) => w.id === active.id);
      const overIndex = homeWidgets.findIndex((w) => w.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newWidgets = arrayMove(homeWidgets, activeIndex, overIndex);
        setHomeWidgets(newWidgets);
      }
    }
  };

  const handleRemoveWidget = (id: string) => {
    setHomeWidgets(homeWidgets.filter((widget) => widget.id !== id));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedWidgetId(null);
  };

  const handleWidgetClick = (id: string) => {
    setSelectedWidgetId(id);
  };

  const handleAddWidget = () => {
    if (selectedWidgetId) {
      const widgetToAdd = availableWidgets.find((w) => w.id === selectedWidgetId);
      if (widgetToAdd && !homeWidgets.some((w) => w.type === widgetToAdd.type)) {
        const newWidget = {
          ...widgetToAdd,
          id: generateUniqueId(),
        };
        setHomeWidgets([...homeWidgets, newWidget]);
        setSelectedWidgetId(null);
        setShowModal(false);
      } else {
        alert('Questo widget è già stato aggiunto.');
      }
    }
  };

  return (
    <>
      <LeftNavbar>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Container className="mt-4" style={{ maxWidth: '1450px', margin: '0 auto', minHeight: '100vh', border: 'none' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="dark" style={{ fontWeight: '900' }} onClick={toggleModal}>
                +
              </Button>
            </div>

            <div className="mt-3 droppable-area">
              <SortableContext items={homeWidgets} strategy={verticalListSortingStrategy}>
                <div className="widget-grid">
                  {homeWidgets.map((widget) => (
                    <SortableWidget
                      key={widget.id}
                      widget={widget}
                      onRemove={handleRemoveWidget}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>

            <DragOverlay>
              {activeWidget ? <SortableWidget widget={activeWidget} /> : null}
            </DragOverlay>

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
      </LeftNavbar>
      <div className="d-md-none">
        <NavFooter />
      </div>
    </>
  );
};

export default Home;