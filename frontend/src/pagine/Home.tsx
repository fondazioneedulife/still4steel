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
              <Button 
                variant="outline-dark" 
                style={{ fontWeight: '900', height: '50px', width: '50px', borderRadius: '50%' }}
                onClick={() => setShowHelpModal(true)}
              >
                ?
              </Button>
              <Button 
                variant="dark" 
                style={{ fontWeight: '900', height: '50px', width: '50px', borderRadius: '50%' }} 
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
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderBottom: '2px solid #dee2e6',
                padding: '2rem',
                borderRadius: '12px 12px 0 0'
              }}>
                <Modal.Title style={{ width: '100%' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(79,172,254,0.3)'
                    }}>
                      <span style={{ fontSize: '2.5rem' }}>🎨</span>
                    </div>
                    <div>
                      <h3 style={{ 
                        color: '#2c3e50', 
                        fontSize: '2rem', 
                        fontWeight: 700,
                        margin: 0
                      }}>
                        Gallery Widget
                      </h3>
                      <p style={{ 
                        color: '#6c757d', 
                        fontSize: '1.1rem',
                        margin: '0.5rem 0 0 0'
                      }}>
                        Scegli e personalizza i tuoi widget preferiti
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    {['Grafici 📊', 'Strumenti 🛠️', 'Calendario 📅', 'Note 📝'].map((category) => (
                      <div key={category} style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        background: '#fff',
                        fontSize: '0.9rem',
                        color: '#6c757d',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        {category}
                      </div>
                    ))}
                  </div>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ 
                padding: '2rem', 
                background: '#ffffff',
                maxHeight: '70vh',
                overflowY: 'auto'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #fff6e6 0%, #ffe1b6 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 4px 15px rgba(255,225,182,0.3)'
                }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                  </div>
                  <p style={{ 
                    margin: 0,
                    color: '#b45309',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    lineHeight: '1.5'
                  }}>
                    Clicca su un widget per selezionarlo e personalizza la tua dashboard
                  </p>
                </div>

                {/* ... rest of the Modal.Body content ... */}
                <p style={{ 
                  marginBottom: '1.5rem', 
                  color: '#6c757d', 
                  fontSize: '1.1rem' 
                }}>
                  Clicca su un widget per selezionarlo e poi su "Aggiungi" per inserirlo nella dashboard
                </p>
                <Row className="g-4">
                  {availableWidgets.map((widget) => (
                    <Col key={widget.id} xs={12} md={6}>
                      <div
                        className={`widget-container ${selectedWidgetId === widget.id ? 'selected-widget' : ''}`}
                        onClick={() => handleWidgetClick(widget.id)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          transform: selectedWidgetId === widget.id ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: selectedWidgetId === widget.id 
                            ? '0 8px 16px rgba(0,123,255,0.15)' 
                            : '0 4px 8px rgba(0,0,0,0.05)',
                          border: selectedWidgetId === widget.id 
                            ? '2px solid #007bff' 
                            : '2px solid transparent',
                          borderRadius: '12px',
                          position: 'relative'
                        }}
                      >
                        {selectedWidgetId === widget.id && (
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#007bff',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            zIndex: 1
                          }}>
                            Selezionato ✓
                          </div>
                        )}
                        <SortableWidget widget={widget} isInModal />
                      </div>
                    </Col>
                  ))}
                </Row>
              </Modal.Body>
              <Modal.Footer style={{ 
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                borderTop: '2px solid #dee2e6',
                padding: '1.25rem',
                borderRadius: '0 0 12px 12px',
                gap: '1rem'
              }}>
                <Button 
                  variant="outline-secondary" 
                  onClick={toggleModal}
                  style={{ 
                    padding: '0.75rem 2rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    minWidth: '120px'
                  }}
                >
                  Annulla
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleAddWidget} 
                  disabled={!selectedWidgetId}
                  style={{ 
                    padding: '0.75rem 2rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    background: selectedWidgetId ? '#007bff' : '#e9ecef',
                    border: 'none',
                    boxShadow: selectedWidgetId ? '0 4px 8px rgba(0,123,255,0.2)' : 'none',
                    transition: 'all 0.2s ease',
                    minWidth: '120px'
                  }}
                >
                  {selectedWidgetId ? 'Aggiungi ✓' : 'Seleziona'}
                </Button>
              </Modal.Footer>
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