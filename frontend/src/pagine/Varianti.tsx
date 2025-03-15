import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, PlusCircle, Trash, Pencil } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate, useLocation } from 'react-router-dom';
import './Varianti.css'

const VariantiProdotto: React.FC = () => {
  const [step] = useState<number>(2); // Step 2 nel flusso
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera i dati passati dalla pagina precedente
  const { datiProdotto } = location.state || {};

  // Varianti base predefinite
  const [variantiBase, setVariantiBase] = useState<{ id: number; nome: string; tipo: string }[]>([
    { id: 1, nome: 'Materiale', tipo: '' },
    { id: 2, nome: 'Colore', tipo: '' },
    { id: 3, nome: 'Taglia', tipo: '' },
    { id: 4, nome: 'Stampa', tipo: '' },
    { id: 5, nome: 'Finitura', tipo: '' },
  ]);

  // Varianti personalizzate aggiunte dall'utente
  const [variantiPersonalizzate, setVariantiPersonalizzate] = useState<{ id: number; nome: string; tipo: string }[]>([]);

  // Stato per il form di aggiunta varianti
  const [nomeVariante, setNomeVariante] = useState<string>('');
  const [tipoVariante, setTipoVariante] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Aggiungi o modifica una variante personalizzata
  const handleAggiungiVariante = () => {
    if (nomeVariante && tipoVariante) {
      const nuovaVariante = {
        id: Date.now(),
        nome: nomeVariante,
        tipo: tipoVariante,
      };

      if (editIndex !== null) {
        // Modifica una variante esistente
        const nuoveVarianti = [...variantiPersonalizzate];
        nuoveVarianti[editIndex] = nuovaVariante;
        setVariantiPersonalizzate(nuoveVarianti);
        setEditIndex(null);
      } else {
        // Aggiungi una nuova variante
        setVariantiPersonalizzate([...variantiPersonalizzate, nuovaVariante]);
      }

      // Resetta i campi del form
      setNomeVariante('');
      setTipoVariante('');
      setShowModal(false);
    }
  };

  // Rimuovi una variante personalizzata
  const handleRimuoviVariante = (id: number) => {
    setVariantiPersonalizzate(variantiPersonalizzate.filter((variante) => variante.id !== id));
  };

  // Modifica una variante personalizzata
  const handleModificaVariante = (index: number) => {
    const variante = variantiPersonalizzate[index];
    setNomeVariante(variante.nome);
    setTipoVariante(variante.tipo);
    setEditIndex(index);
    setShowModal(true);
  };

  // Passa alla pagina successiva
  const handleNext = () => {
    // Create an object with all variants data
    const variantiData = {
      variantiBase: variantiBase.reduce((acc, variante) => ({
        ...acc,
        [variante.nome.toLowerCase()]: variante.tipo
      }), {}),
      variantiPersonalizzate: variantiPersonalizzate.reduce((acc, variante) => ({
        ...acc,
        [variante.nome.toLowerCase()]: variante.tipo
      }), {})
    };

    // Save to sessionStorage
    sessionStorage.setItem('variantiData', JSON.stringify(variantiData));
    navigate('/magazzino/seconda-sottopagina');
  };

  // Torna alla pagina precedente
  const handlePrev = () => {
    navigate('/magazzino/aggiungi-prodotti', { state: { datiProdotto } });
  };

  // ... imports remain the same ...

return (
  <Container className="mt-4 varianti-prodotto-page">
    <Stepper steps={steps} currentStep={step} />
    <Card className="mb-4 form-card shadow-sm">
      <Card.Body className="p-4">
        <h3 className="mb-4 fw-semibold text-dark">Varianti del Prodotto</h3>

        {/* Varianti Base */}
        <h5 className="mb-3 fw-medium text-primary">Varianti Base</h5>
        <Row className="g-4 mb-5">
          {variantiBase.map((variante, index) => (
            <Col md={6} key={variante.id}>
              <Card className="variant-card border-0 shadow-sm">
                <Card.Body className="p-3">
                  <Card.Title className="mb-3 fw-medium">{variante.nome}</Card.Title>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder={`Es: ${variante.nome === 'Materiale' ? 'Cotone' : variante.nome === 'Colore' ? 'Rosso' : '...'}`}
                      value={variante.tipo}
                      onChange={(e) => {
                        const nuoveVarianti = [...variantiBase];
                        nuoveVarianti[index].tipo = e.target.value;
                        setVariantiBase(nuoveVarianti);
                      }}
                      className="form-input py-2"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Varianti Personalizzate */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-medium text-primary">Varianti Personalizzate</h5>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowModal(true)}
            className="d-flex align-items-center gap-2"
          >
            <PlusCircle size={18} /> Aggiungi Variante
          </Button>
        </div>

        <Row className="g-4">
          {variantiPersonalizzate.map((variante, index) => (
            <Col md={4} key={variante.id}>
              <Card className="variant-card border-0 shadow-sm">
                <Card.Body className="p-3">
                  <Card.Title className="mb-3 fw-medium">{variante.nome}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    <strong>Tipo:</strong> {variante.tipo}
                  </Card.Text>
                  <div className="d-flex gap-2 justify-content-end">
                    <Button 
                      variant="link" 
                      onClick={() => handleModificaVariante(index)}
                      className="text-primary p-1"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button 
                      variant="link" 
                      onClick={() => handleRimuoviVariante(variante.id)}
                      className="text-danger p-1"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>

    {/* Modal styling */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="fw-medium">
          {editIndex !== null ? 'Modifica Variante' : 'Aggiungi Variante'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-4">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Nome Variante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es: Trama, Design"
              value={nomeVariante}
              onChange={(e) => setNomeVariante(e.target.value)}
              className="form-input py-2"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es: Rigato, Floreale"
              value={tipoVariante}
              onChange={(e) => setTipoVariante(e.target.value)}
              className="form-input py-2"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleAggiungiVariante}>
          {editIndex !== null ? 'Salva Modifiche' : 'Aggiungi'}
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Navigation buttons */}
    <div className="d-flex justify-content-between mt-4">
      <Button variant="outline-dark" onClick={handlePrev} className="nav-button px-4 py-2">
        <ArrowLeft size={20} className="me-2" /> Precedente
      </Button>
      <Button variant="dark" onClick={handleNext} className="nav-button px-4 py-2">
        Successivo <ArrowRight size={20} className="ms-2" />
      </Button>
    </div>
  </Container>
);
};

export default VariantiProdotto;