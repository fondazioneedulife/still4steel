import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Cash, Tag, Percent, Box, BoxArrowInDown } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import LeftNavbar from '../componenti/NavbarDesktop';
import { useProductData } from './ContestoProdotto';

const SecondaSottopagina: React.FC = () => {
  const { productData, setProductData } = useProductData();
  const [step] = useState<number>(3);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  
  // Initialize form state
  const [prezzoAcquisto, setPrezzoAcquisto] = useState<string>('');
  const [prezzoVendita, setPrezzoVendita] = useState<string>('');
  const [iva, setIva] = useState<string>('');
  const [quantita, setQuantita] = useState<string>('');
  const [quantitaMinima, setQuantitaMinima] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (productData?.magazzino) {
      setPrezzoAcquisto(productData.magazzino.prezzoAcquisto || '');
      setPrezzoVendita(productData.magazzino.prezzoVendita || '');
      setIva(productData.magazzino.iva || '');
      setQuantita(productData.magazzino.quantita || '');
      setQuantitaMinima(productData.magazzino.quantitaMinima || '');
    }
  }, [productData]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!prezzoAcquisto.trim()) newErrors.prezzoAcquisto = 'Il prezzo di acquisto è obbligatorio';
    if (!prezzoVendita.trim()) newErrors.prezzoVendita = 'Il prezzo di vendita è obbligatorio';
    if (!iva.trim()) newErrors.iva = 'L\'IVA è obbligatoria';
    if (!quantita.trim()) newErrors.quantita = 'La quantità è obbligatoria';
    if (!quantitaMinima.trim()) newErrors.quantitaMinima = 'La quantità minima è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const updatedData = {
        ...productData,
        magazzino: {
          prezzoAcquisto,
          prezzoVendita,
          iva,
          quantita,
          quantitaMinima
        }
      };
      
      // Save to context
      setProductData(updatedData);
      
      // Save to sessionStorage
      sessionStorage.setItem('secondaSottopaginaData', JSON.stringify({
        prezzoAcquisto,
        prezzoVendita,
        iva,
        quantita,
        quantitaMinima
      }));
      
      navigate('/magazzino/terza-sottopagina');
    }
  };

  const handlePrev = () => {
    // Save to sessionStorage before navigating back
    sessionStorage.setItem('secondaSottopaginaData', JSON.stringify({
      prezzoAcquisto,
      prezzoVendita,
      iva,
      quantita,
      quantitaMinima
    }));
    
    setProductData(prevData => ({
      ...prevData,
      magazzino: {
        prezzoAcquisto,
        prezzoVendita,
        iva,
        quantita,
        quantitaMinima
      }
    }));
    navigate('/magazzino/aggiungi-prodotti');
  };

  const handleNumericInput = (value: string, setter: (value: string) => void) => {
    // Allow only numbers and decimal point
    const regex = /^\d*\.?\d*$/;
    if (value === '' || regex.test(value)) {
      setter(value);
    }
  };

  return (
    <LeftNavbar>
      <Container className="mt-4 seconda-sottopagina-page">
        <Stepper steps={steps} currentStep={step} />
        <Card className="mb-4 form-card shadow-sm">
          <Card.Body className="p-4">
            <Form.Group className="input-container">
              <Form.Label className="form-label d-flex align-items-center">
                <Cash size={18} className="me-2 text-primary" />
                <span className="fw-medium">Prezzo di Acquisto</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il prezzo di acquisto..."
                value={prezzoAcquisto}
                onChange={(e) => handleNumericInput(e.target.value, setPrezzoAcquisto)}
                isInvalid={!!errors.prezzoAcquisto}
                className="form-input py-2"
              />
              <Form.Control.Feedback type="invalid">{errors.prezzoAcquisto}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="input-container mt-4">
              <Form.Label className="form-label d-flex align-items-center">
                <Tag size={18} className="me-2 text-primary" />
                <span className="fw-medium">Prezzo di Vendita</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il prezzo di vendita..."
                value={prezzoVendita}
                onChange={(e) => handleNumericInput(e.target.value, setPrezzoVendita)}
                isInvalid={!!errors.prezzoVendita}
                className="form-input py-2"
              />
              <Form.Control.Feedback type="invalid">{errors.prezzoVendita}</Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group className="input-container mt-4">
              <Form.Label className="form-label d-flex align-items-center">
                <Percent size={18} className="me-2 text-primary" />
                <span className="fw-medium">IVA</span>
              </Form.Label>
              <Form.Select
                value={iva}
                onChange={(e) => setIva(e.target.value)}
                isInvalid={!!errors.iva}
                className="form-input py-2"
              >
                <option value="">Seleziona l'IVA</option>
                <option value="4">4%</option>
                <option value="10">10%</option>
                <option value="22">22%</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.iva}</Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group className="input-container mt-4">
              <Form.Label className="form-label d-flex align-items-center">
                <Box size={18} className="me-2 text-primary" />
                <span className="fw-medium">Quantità Prodotto</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la quantità..."
                value={quantita}
                onChange={(e) => handleNumericInput(e.target.value, setQuantita)}
                isInvalid={!!errors.quantita}
                className="form-input py-2"
              />
              <Form.Control.Feedback type="invalid">{errors.quantita}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="input-container mt-4">
              <Form.Label className="form-label d-flex align-items-center">
                <BoxArrowInDown size={18} className="me-2 text-primary" />
                <span className="fw-medium">Quantità Minima</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la quantità minima..."
                value={quantitaMinima}
                onChange={(e) => handleNumericInput(e.target.value, setQuantitaMinima)}
                isInvalid={!!errors.quantitaMinima}
                className="form-input py-2"
              />
              <Form.Control.Feedback type="invalid">{errors.quantitaMinima}</Form.Control.Feedback>
            </Form.Group>
          </Card.Body>
        </Card>
  
        <div className="d-flex justify-content-between w-100 mt-4">
          <Button variant="outline-dark" onClick={handlePrev} className="nav-button px-4 py-2">
            <ArrowLeft size={20} className="me-2" /> Precedente
          </Button>
          <Button variant="dark" onClick={handleNext} className="nav-button px-4 py-2">
            Successivo <ArrowRight size={20} className="ms-2" />
          </Button>
        </div>
      </Container>
    </LeftNavbar>
  );
};

export default SecondaSottopagina;