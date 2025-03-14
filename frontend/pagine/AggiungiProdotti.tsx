import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Tag, List, FileText, InfoCircle } from 'react-bootstrap-icons';
import Stepper from '../src/componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import LeftNavbar from '../src/componenti/NavbarDesktop';

const AggiungiProdotti: React.FC = () => {
  const [step] = useState<number>(1);
  const steps = [1, 2, 3, 4, 5];

  const [nomeProdotto, setNomeProdotto] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [descrizione, setDescrizione] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!nomeProdotto.trim()) newErrors.nomeProdotto = 'Il nome del prodotto è obbligatorio';
    if (!sku.trim()) newErrors.sku = 'Il codice SKU è obbligatorio';
    if (!categoria.trim()) newErrors.categoria = 'La categoria è obbligatoria';
    if (!descrizione.trim()) newErrors.descrizione = 'La descrizione è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/magazzino/seconda-sottopagina');
    }
  };

  const handlePrev = () => {
    navigate('/magazzino');
  };

  return (
      <LeftNavbar>
    <Container className="mt-4 aggiungi-prodotti-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <Tag size={16} className="me-2" /> Nome prodotto
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome del prodotto..."
                  value={nomeProdotto}
                  onChange={(e) => setNomeProdotto(e.target.value)}
                  isInvalid={!!errors.nomeProdotto}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.nomeProdotto}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <List size={16} className="me-2" /> Codice SKU
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il codice SKU..."
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  isInvalid={!!errors.sku}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <InfoCircle size={16} className="me-2" /> Categoria
                </Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  isInvalid={!!errors.categoria}
                  className="form-input"
                >
                  <option value="">Seleziona una categoria</option>
                  <option value="Categoria A">Categoria A</option>
                  <option value="Categoria B">Categoria B</option>
                  <option value="Categoria C">Categoria C</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.categoria}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <FileText size={16} className="me-2" /> Descrizione
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Inserisci una descrizione..."
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                  isInvalid={!!errors.descrizione}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.descrizione}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between navigation-buttons">
        <Button variant='outline-dark' onClick={handlePrev} className="nav-button">
          <ArrowLeft size={24} /> Precedente
        </Button>
        <Button variant='dark' onClick={handleNext} className="nav-button">
          <ArrowRight size={24} /> Avanti
        </Button>
      </div>
    </Container>
      </LeftNavbar>
  );
};

export default AggiungiProdotti;