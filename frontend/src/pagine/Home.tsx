import React, { useState, useEffect } from 'react';
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
  // Load widgets from localStorage on initial render
  const [homeWidgets, setHomeWidgets] = useState<Widget[]>(() => {
    const savedWidgets = localStorage.getItem('homeWidgets');
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [activeWidget, setActiveWidget] = useState<Widget | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

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

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('homeWidgets', JSON.stringify(homeWidgets));
  }, [homeWidgets]);

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
        const updatedWidgets = [...homeWidgets, newWidget];
        setHomeWidgets(updatedWidgets);
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
    const updatedWidgets = homeWidgets.filter((widget) => widget.id !== id);
    setHomeWidgets(updatedWidgets);
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
              <Button 
                variant="outline-dark" 
                style={{ fontWeight: '900', height: '50px', width: '50px', borderRadius: '50%' }}
                onClick={() => setShowHelpModal(true)}
              >
                ?
              </Button>
              <Button 
                variant="dark" 
                style={{ 
                  fontWeight: '900', 
                  height: '50px', 
                  width: '50px', 
                  borderRadius: '50%',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  lineHeight: '0',  // Changed to 0
                  transform: 'translateY(-1px)'  // Adjusted translation
                }} 
                onClick={toggleModal}
              >
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
              <Modal.Header closeButton style={{ 
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderBottom: '2px solid #000000',
                padding: '2rem'
              }}>
                <Modal.Title style={{ width: '100%' }}>
                  <div style={{
                    borderLeft: '4px solid #000000',
                    paddingLeft: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{ 
                      color: '#000000', 
                      fontSize: '2.2rem', 
                      fontWeight: 800,
                      margin: 0,
                      letterSpacing: '-0.5px'
                    }}>
                      Widget Disponibili
                    </h3>
                    <p style={{
                      color: '#666666',
                      fontSize: '1.1rem',
                      margin: '0.25rem 0 0 0'
                    }}>
                      Personalizza la tua dashboard
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '1.2rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem'
                  }}>
                    {[
                      { name: 'Grafici', icon: '📊' },
                      { name: 'Strumenti', icon: '🛠️' },
                      { name: 'Calendario', icon: '📅' },
                      { name: 'Note', icon: '📝' }
                    ].map((category) => (
                      <div key={category.name} style={{
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#333333'
                      }}>
                        <span style={{ fontSize: '1.4rem' }}>{category.icon}</span>
                        {category.name}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem',
                    position: 'relative',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        background: '#ffffff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: '2rem' }}>💡</span>
                      </div>
                      <p style={{ 
                        margin: 0,
                        fontSize: '1rem',
                        color: '#333333',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        Seleziona un widget per aggiungere nuove funzionalità alla tua dashboard. Puoi aggiungere un solo widget per tipo.
                      </p>
                    </div>
                    </div>
                    <div>
                    <br></br>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outline-dark" 
                        onClick={toggleModal}
                        style={{ 
                          padding: '0.75rem 2rem',
                          fontWeight: 500,
                          borderRadius: '8px',
                          color: '#666666'
                        }}
                      >
                        Annulla
                      </Button>
                      <Button 
                        variant="dark" 
                        style={{ 
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }} 
                        onClick={toggleModal}
                      >
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>+</span>
                        Aggiungi Widget
                      </Button>
                    </div>
                  </div>
                </Modal.Title>
                <br></br>
                {/* <Button 
                  variant="outline-dark" 
                  onClick={toggleModal}
                  style={{ 
                    padding: '0.75rem 2rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    border: '2px solid #666666',
                    color: '#666666',
                    background: 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Annulla
                </Button>
                <Button 
                  variant="dark" 
                  onClick={handleAddWidget} 
                  disabled={!selectedWidgetId}
                  style={{ 
                    padding: '0.75rem 2rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    background: selectedWidgetId ? '#000000' : '#cccccc',
                    border: 'none',
                    minWidth: '120px'
                  }}
                >
                  {selectedWidgetId ? 'Aggiungi' : 'Seleziona'}
                </Button> */}
              </Modal.Header>

              <Modal.Body style={{ 
                padding: '2rem', 
                background: '#ffffff'
              }}>
                <Row className="g-4">
                  {availableWidgets.map((widget) => (
                    <Col key={widget.id} xs={12} md={6}>
                      <div
                        className={`widget-container ${selectedWidgetId === widget.id ? 'selected-widget' : ''}`}
                        onClick={() => handleWidgetClick(widget.id)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: selectedWidgetId === widget.id 
                            ? '2px solid #000000' 
                            : '1px solid #e0e0e0',
                          borderRadius: '12px',
                          position: 'relative',
                          background: '#ffffff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                      >
                        <SortableWidget widget={widget} isInModal />
                      </div>
                    </Col>
                  ))}
                </Row>
              </Modal.Body>
            </Modal>

            <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)} centered>
              <Modal.Header closeButton style={{ 
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                borderBottom: '2px solid #dee2e6',
                padding: '1.5rem'
              }}>
                <Modal.Title style={{ 
                  color: '#2c3e50', 
                  fontSize: '1.75rem', 
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}>
                  Come utilizzare la Dashboard
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ 
                padding: '2rem', 
                background: '#ffffff',
                fontSize: '1.1rem'
              }}>
                <ol style={{ 
                  paddingLeft: '1.5rem', 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}>
                  <li style={{ color: '#2c3e50', lineHeight: '1.7' }}>
                    Clicca il pulsante <strong style={{ 
                      color: '#000',
                      background: '#f8f9fa',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>+</strong> per aprire il menu dei widget disponibili
                  </li>
                  <li style={{ color: '#2c3e50', lineHeight: '1.7' }}>
                    Seleziona un widget dalla lista e clicca <strong style={{ 
                      color: '#007bff',
                      background: '#e7f2ff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>Aggiungi</strong>
                  </li>
                  <li style={{ color: '#2c3e50', lineHeight: '1.7' }}>
                    Puoi trascinare i widget per riorganizzarli nella dashboard
                  </li>
                  <li style={{ color: '#2c3e50', lineHeight: '1.7' }}>
                    Ogni widget ha controlli per il tema <span style={{ 
                      background: '#f8f9fa',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>🌙/☀️</span> e rimozione <span style={{ 
                      background: '#f8f9fa',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>✕</span>
                  </li>
                  <li style={{ color: '#2c3e50', lineHeight: '1.7' }}>
                    Personalizza la dashboard aggiungendo i widget che preferisci
                  </li>
                </ol>
              </Modal.Body>
              <Modal.Footer style={{ 
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                borderTop: '2px solid #dee2e6',
                padding: '1.25rem'
              }}>
                <Button 
                  variant="primary" 
                  onClick={() => setShowHelpModal(false)}
                  style={{ 
                    padding: '0.75rem 2.5rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    background: '#007bff',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0,123,255,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Ho capito
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