import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Spedizioni.css';
import LeftNavbar from '../componenti/NavbarDesktop';
import NavFooter from '../componenti/NavFooter';

const Spedizioni: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  // Add shipmentType to the state
  const [selectedShipmentType, setSelectedShipmentType] = useState<string>('');
  
  // Update shipments data to include shipmentType
  const [shipments, setShipments] = useState([
    { id: 1, trackingNumber: 'TRK123456', status: 'In transito', date: '2024-10-01', sender: 'Mittente 1', recipient: 'Destinatario 1', weight: '200 kg', shipmentType: 'in-entrata' },
    { id: 2, trackingNumber: 'TRK789012', status: 'Consegnato', date: '2024-09-28', sender: 'Mittente 2', recipient: 'Destinatario 2', weight: '150 kg', shipmentType: 'in-uscita' },
    { id: 3, trackingNumber: 'TRK345678', status: 'In elaborazione', date: '2025-02-05', sender: 'Mittente 3', recipient: 'Destinatario 3', weight: '300 kg', shipmentType: 'in-entrata' },
    { id: 4, trackingNumber: 'TRK901234', status: 'In transito', date: '2025-02-03', sender: 'Mittente 1', recipient: 'Destinatario 2', weight: '180 kg', shipmentType: 'in-uscita' },
    { id: 5, trackingNumber: 'TRK567890', status: 'Consegnato', date: '2025-02-30', sender: 'Mittente 2', recipient: 'Destinatario 3', weight: '250 kg', shipmentType: 'in-entrata' },
    { id: 6, trackingNumber: 'TRK123890', status: 'In elaborazione', date: '2025-03-06', sender: 'Mittente 3', recipient: 'Destinatario 1', weight: '120 kg', shipmentType: 'in-uscita' },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  // Aggiungi le spedizioni importate alla lista
  useEffect(() => {
    const importedShipments = location.state?.importedShipments || [];
    if (importedShipments.length > 0) {
      setShipments((prevShipments) => [...prevShipments, ...importedShipments]);
    }
  }, [location.state]);

  // Filtra le spedizioni in base al termine di ricerca e allo stato
  // Update the filter function
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || shipment.status === selectedStatus;
    const matchesType = selectedShipmentType === '' || shipment.shipmentType === selectedShipmentType;
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // In the return statement, add the new filter dropdown
  return (
    <>
    <LeftNavbar>
  <Container className="spedizioni-page">
    {/* Titolo della pagina */}
    <h1 className="page-title">Spedizioni</h1>

    {/* Filtri */}
    <Row className="mb-4">
      <Col md={4} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Cerca per numero di tracciamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Col md={4} className="mb-2">
        <Form.Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Tutti gli stati</option>
          <option value="Consegnato">Consegnato</option>
          <option value="In transito">In transito</option>
          <option value="In elaborazione">In elaborazione</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          value={selectedShipmentType}
          onChange={(e) => setSelectedShipmentType(e.target.value)}
        >
          <option value="">Tutte le spedizioni</option>
          <option value="in-entrata">In Entrata</option>
          <option value="in-uscita">In Uscita</option>
        </Form.Select>
      </Col>
    </Row>

    {/* Lista delle spedizioni */}
    <Row>
      {filteredShipments.map((shipment) => (
        <Col key={shipment.id} md={6} lg={4} className="mb-3">
          <Card className="shipment-card">
            <Card.Body>
              <div className="shipment-tracking">Tracking: {shipment.trackingNumber}</div>
              <div className="shipment-status">
                Stato: <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`} 
                  style={{ 
                    backgroundColor: shipment.status === 'Consegnato' 
                      ? 'var(--bs-success)' 
                      : shipment.status === 'In transito' 
                      ? 'var(--bs-warning)' 
                      : 'var(--bs-primary)'
                  }}>
                  {shipment.status}
                </span>
              </div>
              <div className="shipment-date">Data: {shipment.date}</div>
              <div className="shipment-details">
                <div><strong>Mittente:</strong> {shipment.sender}</div>
                <div><strong>Destinatario:</strong> {shipment.recipient}</div>
                <div><strong>Peso:</strong> {shipment.weight}</div>
              </div>
              <Button
                variant={shipment.status === 'Consegnato' ? 'success' : shipment.status === 'In transito' ? 'warning' :  shipment.status === 'In elaborazione' ? 'blu' : 'default'}
                className={` view-button ${shipment.status === 'In elaborazione' ? '' : 'primary'}`}
                onClick={() => navigate('/magazzino/dettagli-spedizione', { state: { shipment } })}
              >
                Dettagli
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</LeftNavbar>

{/* Footer Navbar visibile solo su dispositivi mobili */}
<div className="d-md-none">
<NavFooter />
</div>
</>
  );
};

export default Spedizioni;