import { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Person, Hash, Calendar, Envelope, Telephone } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import LeftNavbar from '../componenti/NavbarDesktop';
import { useProductData } from '../pagine/ContestoProdotto';

const TerzaSottopagina: React.FC = () => {
  const [step] = useState<number>(3);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const { productData, setProductData } = useProductData();

  // Initialize form state
  const [nomeFornitore, setNomeFornitore] = useState<string>('');
  const [codiceFornitore, setCodiceFornitore] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [emailFornitore, setEmailFornitore] = useState<string>('');
  const [telefonoFornitore, setTelefonoFornitore] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === '' || emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Only count actual digits, ignoring spaces and other characters
    const digitsOnly = phone.replace(/\D/g, '');
    return phone === '' || digitsOnly.length === 10;
  };

  const handlePhoneChange = (value: string) => {
    // Allow only digits, spaces, and basic formatting characters
    const formattedValue = value.replace(/[^\d\s()-]/g, '');
    setTelefonoFornitore(formattedValue);
    
    const digitsOnly = formattedValue.replace(/\D/g, '');
    if (digitsOnly.length !== 10 && formattedValue !== '') {
      setErrors(prev => ({ ...prev, telefonoFornitore: 'Il numero di telefono deve contenere 10 cifre' }));
    } else {
      setErrors(prev => ({ ...prev, telefonoFornitore: '' }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmailFornitore(value);
    if (!validateEmail(value) && value !== '') {
      setErrors(prev => ({ ...prev, emailFornitore: 'Inserisci un indirizzo email valido' }));
    } else {
      setErrors(prev => ({ ...prev, emailFornitore: '' }));
    }
  };

  // Update form fields when productData changes
  useEffect(() => {
    if (productData?.fornitore) {
      setNomeFornitore(productData.fornitore.nomeFornitore);
      setCodiceFornitore(productData.fornitore.codiceFornitore);
      setData(productData.fornitore.data);
      setEmailFornitore(productData.fornitore.emailFornitore);
      setTelefonoFornitore(productData.fornitore.telefonoFornitore);
    }
  }, [productData]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nomeFornitore.trim()) newErrors.nomeFornitore = 'Il nome del fornitore è obbligatorio';
    if (!codiceFornitore.trim()) newErrors.codiceFornitore = 'Il codice del fornitore è obbligatorio';
    if (!data.trim()) newErrors.data = 'La data è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const updatedData = {
        ...productData,
        fornitore: {
          nomeFornitore,
          codiceFornitore,
          data,
          emailFornitore,
          telefonoFornitore
        }
      };
      
      // Save to context
      setProductData(updatedData);
      
      // Save to sessionStorage
      sessionStorage.setItem('terzaSottopaginaData', JSON.stringify({
        nomeFornitore,
        codiceFornitore,
        data,
        emailFornitore,
        telefonoFornitore
      }));
      
      navigate('/magazzino/riepilogo');
    }
  };

  const handlePrev = () => {
    // Save to sessionStorage before navigating back
    sessionStorage.setItem('terzaSottopaginaData', JSON.stringify({
      nomeFornitore,
      codiceFornitore,
      data,
      emailFornitore,
      telefonoFornitore
    }));
    
    setProductData(prevData => ({
      ...prevData,
      fornitore: {
        nomeFornitore,
        codiceFornitore,
        data,
        emailFornitore,
        telefonoFornitore
      }
    }));
    navigate('/magazzino/seconda-sottopagina');
  };

  return (
    <LeftNavbar>
    <Container className="mt-4 terza-sottopagina-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-4 form-card shadow-sm">
        <Card.Body className="p-4">
          <Form.Group className="input-container">
            <Form.Label className="form-label d-flex align-items-center">
              <Person size={18} className="me-2 text-primary" />
              <span className="fw-medium">Nome Fornitore</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il nome del fornitore..."
              value={nomeFornitore}
              onChange={(e) => setNomeFornitore(e.target.value)}
              isInvalid={!!errors.nomeFornitore}
              className="form-input py-2"
            />
            <Form.Control.Feedback type="invalid">{errors.nomeFornitore}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-container mt-4">
            <Form.Label className="form-label d-flex align-items-center">
              <Hash size={18} className="me-2 text-primary" />
              <span className="fw-medium">Codice Fornitore</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il codice del fornitore..."
              value={codiceFornitore}
              onChange={(e) => setCodiceFornitore(e.target.value)}
              isInvalid={!!errors.codiceFornitore}
              className="form-input py-2"
            />
            <Form.Control.Feedback type="invalid">{errors.codiceFornitore}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-container mt-4">
            <Form.Label className="form-label d-flex align-items-center">
              <Calendar size={18} className="me-2 text-primary" />
              <span className="fw-medium">Data</span>
            </Form.Label>
            <Form.Control
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              isInvalid={!!errors.data}
              className="form-input py-2"
            />
            <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-container mt-4">
            <Form.Label className="form-label d-flex align-items-center">
              <Envelope size={18} className="me-2 text-primary" />
              <span className="fw-medium">Email Fornitore</span>
              <span className="ms-2 text-muted">(Opzionale)</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci l'email del fornitore..."
              value={emailFornitore}
              onChange={(e) => handleEmailChange(e.target.value)}
              isInvalid={!!errors.emailFornitore}
              className="form-input py-2"
            />
            <Form.Control.Feedback type="invalid">{errors.emailFornitore}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-container mt-4">
            <Form.Label className="form-label d-flex align-items-center">
              <Telephone size={18} className="me-2 text-primary" />
              <span className="fw-medium">Telefono Fornitore</span>
              <span className="ms-2 text-muted">(Opzionale)</span>
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Inserisci il telefono del fornitore..."
              value={telefonoFornitore}
              onChange={(e) => handlePhoneChange(e.target.value)}
              isInvalid={!!errors.telefonoFornitore}
              className="form-input py-2"
            />
            <Form.Control.Feedback type="invalid">{errors.telefonoFornitore}</Form.Control.Feedback>
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

export default TerzaSottopagina;