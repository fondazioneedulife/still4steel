import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Person, Hash, Calendar, Envelope, Telephone } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate, useLocation } from 'react-router-dom';

const TerzaSottopagina: React.FC = () => {
  const [step] = useState<number>(3);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera i dati passati dalla pagina precedente
  const { datiProdotto, datiMagazzino } = location.state || {};

  // Stato per i campi del form
  const [nomeFornitore, setNomeFornitore] = useState<string>('');
  const [codiceFornitore, setCodiceFornitore] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [emailFornitore, setEmailFornitore] = useState<string>('');
  const [telefonoFornitore, setTelefonoFornitore] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validazione del form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nomeFornitore.trim()) newErrors.nomeFornitore = 'Il nome del fornitore è obbligatorio';
    if (!codiceFornitore.trim()) newErrors.codiceFornitore = 'Il codice del fornitore è obbligatorio';
    if (!data.trim()) newErrors.data = 'La data è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Passa alla pagina di riepilogo
  const handleNext = () => {
    if (validateForm()) {
      const fornitoreData = {
        nomeFornitore: nomeFornitore,
        codiceFornitore: codiceFornitore,
        data: data,
        emailFornitore: emailFornitore,
        telefonoFornitore: telefonoFornitore
      };
  
      // Save to sessionStorage
      sessionStorage.setItem('terzaSottopaginaData', JSON.stringify(fornitoreData));
      navigate('/riepilogo');
    }
  };

  // Torna alla pagina precedente
  const handlePrev = () => {
    navigate('/seconda-sottopagina', { state: { datiProdotto, datiMagazzino } });
  };

  return (
    <Container className="mt-4 terza-sottopagina-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Person size={16} className="me-2" /> Nome Fornitore
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il nome del fornitore..."
              value={nomeFornitore}
              onChange={(e) => setNomeFornitore(e.target.value)}
              isInvalid={!!errors.nomeFornitore}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.nomeFornitore}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Hash size={16} className="me-2" /> Codice Fornitore
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il codice del fornitore..."
              value={codiceFornitore}
              onChange={(e) => setCodiceFornitore(e.target.value)}
              isInvalid={!!errors.codiceFornitore}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.codiceFornitore}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Calendar size={16} className="me-2" /> Data
            </Form.Label>
            <Form.Control
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              isInvalid={!!errors.data}
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Envelope size={16} className="me-2" /> Email Fornitore (Opzionale)
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci l'email del fornitore..."
              value={emailFornitore}
              onChange={(e) => setEmailFornitore(e.target.value)}
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="mb-3 input-container">
            <Form.Label className="form-label">
              <Telephone size={16} className="me-2" /> Telefono Fornitore (Opzionale)
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Inserisci il telefono del fornitore..."
              value={telefonoFornitore}
              onChange={(e) => setTelefonoFornitore(e.target.value)}
              className="form-input"
            />
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

export default TerzaSottopagina;