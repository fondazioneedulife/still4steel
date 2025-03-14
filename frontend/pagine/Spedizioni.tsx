import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Spedizioni.css';
import LeftNavbar from '../src/componenti/NavbarDesktop';
import NavFooter from '../src/componenti/NavFooter';

const Spedizioni: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [shipments, setShipments] = useState([
    { id: 1, trackingNumber: 'TRK123456', status: 'In transito', date: '2024-10-01', sender: 'Mittente A', recipient: 'Destinatario X', weight: '2 kg' },
    { id: 2, trackingNumber: 'TRK789012', status: 'Consegnato', date: '2024-09-28', sender: 'Mittente B', recipient: 'Destinatario Y', weight: '5 kg' },
    { id: 3, trackingNumber: 'TRK345678', status: 'In elaborazione', date: '2025-02-05', sender: 'Mittente C', recipient: 'Destinatario Z', weight: '1 kg' },
    { id: 4, trackingNumber: 'TRK901234', status: 'In transito', date: '2025-02-03', sender: 'Mittente D', recipient: 'Destinatario W', weight: '3 kg' },
    { id: 5, trackingNumber: 'TRK567890', status: 'Consegnato', date: '2025-02-30', sender: 'Mittente E', recipient: 'Destinatario V', weight: '4 kg' },
    { id: 6, trackingNumber: 'TRK123890', status: 'In elaborazione', date: '2025-03-06', sender: 'Mittente F', recipient: 'Destinatario U', weight: '2.5 kg' },
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
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || shipment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
    <LeftNavbar>
  <Container className="spedizioni-page">
    {/* Titolo della pagina */}
    <h1 className="page-title">Spedizioni</h1>

    {/* Filtri */}
    <Row className="mb-4">
      <Col md={6} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Cerca per numero di tracciamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Col md={6}>
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
    </Row>

    {/* Lista delle spedizioni */}
    <Row>
      {filteredShipments.map((shipment) => (
        <Col key={shipment.id} md={6} lg={4} className="mb-3">
          <Card className="shipment-card">
            <Card.Body>
              <div className="shipment-tracking">Tracking: {shipment.trackingNumber}</div>
              <div className="shipment-status">
                Stato: <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`}>{shipment.status}</span>
              </div>
              <div className="shipment-date">Data: {shipment.date}</div>
              <div className="shipment-details">
                <div><strong>Mittente:</strong> {shipment.sender}</div>
                <div><strong>Destinatario:</strong> {shipment.recipient}</div>
                <div><strong>Peso:</strong> {shipment.weight}</div>
              </div>
              <Button
                variant={shipment.status === 'Consegnato' ? 'success' : shipment.status === 'In transito' ? 'warning' : 'primary'}
                className="view-button"
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