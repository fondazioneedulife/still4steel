import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import './DettagliSpedizione.css';
import jsPDF from 'jspdf';

const DettagliSpedizione: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shipment = location.state?.shipment;

  // Funzione per scaricare i dettagli come PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Titolo del PDF
    doc.setFontSize(18);
    doc.text('Dettagli Spedizione', 10, 10);

    // Dettagli della spedizione
    doc.setFontSize(12);
    doc.text(`Tracking: ${shipment.trackingNumber}`, 10, 20);
    doc.text(`Stato: ${shipment.status}`, 10, 30);
    doc.text(`Data: ${shipment.date}`, 10, 40);
    doc.text(`Mittente: ${shipment.sender}`, 10, 50);
    doc.text(`Destinatario: ${shipment.recipient}`, 10, 60);
    doc.text(`Peso: ${shipment.weight}`, 10, 70);

    // Salva il PDF
    doc.save(`spedizione_${shipment.trackingNumber}.pdf`);
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
          <Button variant="dark" onClick={downloadPDF} className="download-button">
            Scarica PDF
          </Button>
          <Button variant="outline secondary" onClick={() => navigate('/spedizioni')} className="back-button">
            Torna alle Spedizioni
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DettagliSpedizione;