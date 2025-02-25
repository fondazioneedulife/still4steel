import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import './DettagliSpedizione.css';

const DettagliSpedizione: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shipment = location.state?.shipment; // Dati della spedizione passati tramite navigate

  // Funzione per scaricare i dati come file JSON
  const downloadData = () => {
    const blob = new Blob([JSON.stringify(shipment, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spedizione_${shipment.trackingNumber}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container className="dettagli-spedizione-page">
      <h1 className="page-title">Dettagli Spedizione</h1>
      <Card className="shipment-details-card">
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
          <Button variant="primary" onClick={downloadData} className="download-button">
            Scarica Dati
          </Button>
          <Button variant="secondary" onClick={() => navigate('/spedizioni')} className="back-button">
            Torna alle Spedizioni
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DettagliSpedizione;