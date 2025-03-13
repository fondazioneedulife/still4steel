import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Cash, Tag, Percent, Box, BoxArrowInDown } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useProductData } from './ContestoProdotto';

const SecondaSottopagina: React.FC = () => {
  const { productData, setProductData } = useProductData();
  const [step] = useState<number>(3);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productData.prezzoAcquisto.trim()) newErrors.prezzoAcquisto = 'Il prezzo di acquisto è obbligatorio';
    if (!productData.prezzoVendita.trim()) newErrors.prezzoVendita = 'Il prezzo di vendita è obbligatorio';
    if (!productData.iva.trim()) newErrors.iva = 'L\'IVA è obbligatoria';
    if (!productData.quantita.trim()) newErrors.quantita = 'La quantità è obbligatoria';
    if (!productData.quantitaMinima.trim()) newErrors.quantitaMinima = 'La quantità minima è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const magazzinoData = {
        prezzoAcquisto: productData.prezzoAcquisto,
        prezzoVendita: productData.prezzoVendita,
        iva: productData.iva,
        quantita: productData.quantita,
        quantitaMinima: productData.quantitaMinima
      };

      // Save to sessionStorage
      sessionStorage.setItem('secondaSottopaginaData', JSON.stringify(magazzinoData));
      navigate('/terza-sottopagina');
    }
  };

  const handlePrev = () => {
    navigate('/varianti');
  };

  return (
    <Container className="mt-4 seconda-sottopagina-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Cash size={16} className="me-2" /> Prezzo di Acquisto
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il prezzo di acquisto..."
              value={productData.prezzoAcquisto}
              onChange={(e) => setProductData({ ...productData, prezzoAcquisto: e.target.value })}
              isInvalid={!!errors.prezzoAcquisto}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.prezzoAcquisto}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Tag size={16} className="me-2" /> Prezzo di Vendita
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il prezzo di vendita..."
              value={productData.prezzoVendita}
              onChange={(e) => setProductData({ ...productData, prezzoVendita: e.target.value })}
              isInvalid={!!errors.prezzoVendita}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.prezzoVendita}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Percent size={16} className="me-2" /> IVA
            </Form.Label>
            <Form.Select
              value={productData.iva}
              onChange={(e) => setProductData({ ...productData, iva: e.target.value })}
              isInvalid={!!errors.iva}
              className="form-input"
            >
              <option value="">Seleziona l'IVA</option>
              <option value="4">4%</option>
              <option value="10">10%</option>
              <option value="22">22%</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.iva}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Box size={16} className="me-2" /> Quantità Prodotto
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci la quantità..."
              value={productData.quantita}
              onChange={(e) => setProductData({ ...productData, quantita: e.target.value })}
              isInvalid={!!errors.quantita}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.quantita}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <BoxArrowInDown size={16} className="me-2" /> Quantità Minima
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci la quantità minima..."
              value={productData.quantitaMinima}
              onChange={(e) => setProductData({ ...productData, quantitaMinima: e.target.value })}
              isInvalid={!!errors.quantitaMinima}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.quantitaMinima}</Form.Control.Feedback>
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between navigation-buttons">
        <Button variant="outline-dark" onClick={handlePrev} className="nav-button btn-prev">
          <ArrowLeft size={24} /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext} className="nav-button btn-next">
          <ArrowRight size={24} /> Successivo
        </Button>
      </div>
    </Container>
  );
};

export default SecondaSottopagina;