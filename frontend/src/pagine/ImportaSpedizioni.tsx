import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ImportaSpedizioni.css';

const ImportaSpedizioni: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  const simulateAPICall = async (service: string, key: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (key === 'valid-key') {
          resolve([
            { id: 7, trackingNumber: 'TRK999999', status: 'In transito', date: '2023-10-07', sender: 'Mittente G', recipient: 'Destinatario T', weight: '2 kg' },
            { id: 8, trackingNumber: 'TRK888888', status: 'Consegnato', date: '2023-10-08', sender: 'Mittente H', recipient: 'Destinatario S', weight: '3 kg' },
            { id: 9, trackingNumber: 'TRK777777', status: 'In elaborazione', date: '2025-10-09', sender: 'Mittente I', recipient: 'Destinatario R', weight: '1 kg' },
          ]);
        } else {
          reject(new Error('Chiave API non valida'));
        }
      }, 2000);
    });
  };

  const handleImport = async () => {
    if (!selectedService || !apiKey) {
      setError('Seleziona un servizio e inserisci una chiave API valida.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const importedShipments = await simulateAPICall(selectedService, apiKey);
      navigate('/spedizioni', { state: { importedShipments } });
      setSuccess('Spedizioni importate con successo!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'importazione delle spedizioni.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="importa-spedizioni-page">
      <div className="importa-form">
        <h1 className="page-title">Importa Spedizioni</h1>

        {error && <Alert variant="danger" className="alert-danger">{error}</Alert>}
        {success && <Alert variant="success" className="alert-success">{success}</Alert>}

        <Row className="mb-4">
          <Col md={6}>
            <Form.Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Seleziona un servizio</option>
              <option value="PosteItaliane>">Poste Italiane</option>
              <option value="Bardolini">Bardolini</option>
              <option value="DHL">DHL</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Inserisci la chiave API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="form-control"
              required
            />
          </Col>
        </Row>

        <div className="buttons-container">
          <Button
            variant="primary"
            onClick={handleImport}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Importazione in corso...</span>
              </>
            ) : (
              'Importa'
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/spedizioni')}
            className="btn-secondary"
          >
            Annulla
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ImportaSpedizioni;